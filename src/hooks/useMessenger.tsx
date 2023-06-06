import { ethers } from 'ethers'
import { useCallback, useContext, useEffect, useState } from 'react'
import { ADDRESSES } from '~/helpers/constants'
import { UserStoreContext } from '~/stores/user'
import { Messenger, Messenger__factory } from '~/types/abi'

export function useMessenger() {
    const [contract, setContract] = useState(null as Messenger | null)
    const { userState } = useContext(UserStoreContext)

    const getMessengerAddress = useCallback(() => {
        switch (userState.chainId) {
            case BigInt(97):
                return ADDRESSES.BSC.MESSENGER
            case BigInt(11155111):
                return ADDRESSES.ETH.MESSENGER
            default:
                return null
        }
    }, [userState])

    useEffect(() => {
        const messengerAddress = getMessengerAddress()

        if (messengerAddress != null) {
            if (userState.isLoggedIn) {
                const messenger = Messenger__factory.connect(messengerAddress, userState.signer) as Messenger
                setContract(messenger)
            } else {
                if (window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum, 'any')
                    const messenger = Messenger__factory.connect(messengerAddress, provider) as Messenger

                    setContract(messenger)
                } else {
                    setContract(null)
                }
            }
        } else {
            setContract(null)
        }

    }, [userState, getMessengerAddress])

    return contract
}
