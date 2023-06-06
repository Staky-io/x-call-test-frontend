import { ethers } from 'ethers'
import { useState, useEffect, useCallback, useContext } from 'react'
import { getBTPAddress } from '~/helpers/btpAddress'
import { ADDRESSES, NETWORKS } from '~/helpers/constants'
import { useMessenger } from '~/hooks'
import { UserStoreContext } from '~/stores/user'

export default function MessengerInput() {
    const [xCallFee, setXCallFee] = useState(BigInt(0))
    const [message, setMessage] = useState('')
    const [from, setFrom] = useState('ETH')
    const [to, setTo] = useState('BSC')
    const { userState, connectWallet, switchChain } = useContext(UserStoreContext)
    const messenger = useMessenger()

    const getXCallFee = useCallback(async(): Promise<bigint> => {
        try {
            const btpAddress = getBTPAddress(ADDRESSES[to].MESSENGER, NETWORKS[to].btpID)

            if (messenger != null) {
                const fee = await messenger.getXCallFee(btpAddress, true)
                return fee
            }

            return BigInt(0)
        } catch (e) {
            console.log(e)
            return BigInt(0)
        }
    }, [messenger, to])

    const sendMessage = async () => {
        const fee = await getXCallFee()
        if (fee != null && messenger != null && message.length > 0 && userState.balance > fee) {
            const tx = await messenger.sendMessage(getBTPAddress(ADDRESSES[to].MESSENGER, NETWORKS[to].btpID), message, { value: fee })
            await tx.wait()
        }
    }

    const switchNetworks = () => {
        switchChain(NETWORKS[to])

        const fromChain = from
        const toChain = to

        setFrom(toChain)
        setTo(fromChain)
    }

    useEffect(() => {
        getXCallFee().then((fee) => setXCallFee(fee))
    }, [userState, getXCallFee, to])

    return (
        <div className="w-full max-w-screen-lg mx-auto text-center">
            <p className="text-2xl font-medium">Send a text message from <span className="text-blue-600">{NETWORKS[from].chainName}</span> to <span className="text-blue-600">{NETWORKS[to].chainName}</span> with the content:</p>
            <p
                className="text-sm underline cursor-pointer"
                onClick={switchNetworks}
            >
                Switch chains
            </p>
            <div className="flex flex-col justify-center items-center mt-10">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full max-w-xl mx-auto px-6 py-4 rounded-2xl border-2 border-black focus:outline-none resize-none"
                    rows={2}
                    placeholder="Type your message here"
                    maxLength={100}
                />

                <p
                    className="text-sm mt-2"
                    onClick={switchNetworks}
                >
                    X-Call fee: {ethers.formatEther(xCallFee)} {NETWORKS[from].nativeCurrency.symbol}
                </p>

                {userState.isLoggedIn ? (
                    userState.chainId === BigInt(NETWORKS[from].chainId) || !userState.wrongNetwork ? (
                        userState.balance > xCallFee ? (
                            <button
                                onClick={sendMessage}
                                className="mx-auto text-center px-16 py-3 mt-5 bg-blue-500 text-white rounded-md"
                            >
                                Send it accross chains !
                            </button>
                        ) : (
                            <button
                                disabled
                                className="mx-auto text-center px-16 py-3 mt-5 bg-red-900 text-white rounded-md"
                            >
                                X-Call fee is too high
                            </button>
                        )
                    ) : (
                        <button
                            onClick={() => switchChain(NETWORKS[from])}
                            className="mx-auto text-center px-16 py-3 mt-5 bg-blue-500 text-white rounded-md"
                        >
                            Switch to {NETWORKS[from].chainName} to send it !
                        </button>
                    )
                ) : (
                    <button
                        onClick={connectWallet}
                        className="mx-auto text-center px-16 py-3 mt-5 bg-blue-500 text-white rounded-md"
                    >
                        Connect your wallet
                    </button>
                )}
            </div>
        </div>
    )
}
