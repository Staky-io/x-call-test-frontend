import { useContext } from 'react'
import { UserStoreContext } from '~/stores/user'

export default function MessengerInput() {
    const { userState, connectWallet } = useContext(UserStoreContext)

    return (
        <div className="w-full max-w-screen-lg mx-auto text-center">
            <p className="text-2xl font-medium">Send a text message from <span className="text-blue-600">BSC</span> to <span className="text-blue-600">ETH</span> with the content:</p>
            <div className="flex flex-col justify-center items-center mt-10">
                <textarea
                    className="w-full max-w-xl mx-auto px-6 py-4 rounded-2xl border-2 border-black focus:outline-none resize-none"
                    rows={2}
                    placeholder="Type your message here"
                    maxLength={100}
                />
                {userState.isLoggedIn ? (
                    <button className="mx-auto text-center px-16 py-3 mt-5 bg-blue-500 text-white rounded-md">Send it accross chains !</button>
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
