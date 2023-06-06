import { createContext, PropsWithChildren } from 'react'
import { ethers } from 'ethers'
import { useImmer } from 'use-immer'
import { NETWORKS } from '~/helpers/constants'
import { NetworkItem } from '~/types'

type UserStoreState = {
    isLoggedIn: boolean
    address: string
    balance: bigint
    chainId: bigint
    provider: ethers.BrowserProvider | null
    signer: ethers.JsonRpcSigner | null
    wrongNetwork: boolean
}

type UserStoreContextType = {
    userState: UserStoreState
    connectWallet: () => Promise<void>
    switchChain: (network: NetworkItem) => Promise<void>
    disconnect: () => void
}

const defaultState: UserStoreState = {
    isLoggedIn: false,
    address: '',
    balance: BigInt(0),
    chainId: BigInt(97),
    provider: null,
    signer: null,
    wrongNetwork: false
}

const UserStoreContext = createContext({
    userState: defaultState
} as UserStoreContextType)

const UserStoreProvider = ({ children }: PropsWithChildren) => {
    const [userState, setUserState] = useImmer({ ...defaultState })

    const supportedChainIds = Object.keys(NETWORKS).map((n: string) => BigInt(NETWORKS[n].chainId))

    const disconnect = () => {
        setUserState(() => defaultState)
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum, 'any')
            const accounts = await provider.send('eth_requestAccounts', [])
            const signer = new ethers.JsonRpcSigner(provider, accounts[0])
            const { chainId } = await provider.getNetwork()
            const balance = await provider.getBalance(accounts[0])

            window.ethereum.on('chainChanged', async (chainId: string) => {
                const balance = await provider.getBalance(accounts[0])
                setUserState((s) => {
                    s.balance = BigInt(balance)
                    s.chainId = BigInt(chainId)
                    s.wrongNetwork = !supportedChainIds.includes(BigInt(chainId))
                })
            })

            window.ethereum.on('accountsChanged', async (accounts: string[]) => {
                const balance = await provider.getBalance(accounts[0])
                setUserState((s) => {
                    s.balance = BigInt(balance)
                    s.address = accounts[0]
                })
            })

            setUserState((s) => {
                s.isLoggedIn = true
                s.address = accounts[0]
                s.balance = BigInt(balance)
                s.provider = provider
                s.signer = signer
                s.chainId = BigInt(chainId)
                s.wrongNetwork = !supportedChainIds.includes(chainId)
            })
        }
    }

    const switchChain = async (network: NetworkItem) => {
        if (window.ethereum) {
            try {
                const n = {
                    ...network,
                    chainId: `0x${network.chainId.toString(16)}`,
                    btpID: undefined
                }

                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [n]
                })
            } catch (switchError) {
                console.log(switchError)
            }
        }
    }

    return (
        <UserStoreContext.Provider value={{
            userState,
            disconnect,
            connectWallet,
            switchChain
        }}>
            {children}
        </UserStoreContext.Provider>
    )
}

export {
    UserStoreContext,
    UserStoreProvider
}
