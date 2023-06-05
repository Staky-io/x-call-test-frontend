import { ethers } from 'ethers'
import { createContext, PropsWithChildren, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { NETWORKS } from '~/helpers/constants'

type UserStoreState = {
    isLoggedIn: boolean
    address: string
    provider: ethers.BrowserProvider | null
    signer: ethers.JsonRpcSigner | null
    wrongNetwork: boolean
}

const defaultState: UserStoreState = {
    isLoggedIn: false,
    address: '',
    provider: null,
    signer: null,
    wrongNetwork: false
}

const UserStoreContext = createContext({
    userState: defaultState,
    disconnect: (): void => { undefined },
    connectWallet: (): void => { undefined }
})

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

            provider.on('chainChanged', (chainId: string) => {
                setUserState((s) => {
                    s.wrongNetwork = !supportedChainIds.includes(BigInt(chainId))
                })
            })

            provider.on('accountsChanged', (accounts: string[]) => {
                setUserState((s) => {
                    s.address = accounts[0]
                })
            })

            setUserState((s) => {
                s.isLoggedIn = true
                s.address = accounts[0]
                s.provider = provider
                s.signer = signer
                s.wrongNetwork = !supportedChainIds.includes(chainId)
            })
        }
    }

    return (
        <UserStoreContext.Provider value={{
            userState,
            disconnect,
            connectWallet
        }}>
            {children}
        </UserStoreContext.Provider>
    )
}

export {
    UserStoreContext,
    UserStoreProvider
}
