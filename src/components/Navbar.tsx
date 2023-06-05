import { useContext } from 'react'
import Link from 'next/link'
import { ActiveLink } from '~/components'
import { UserStoreContext } from '~/stores/user'

export default function Navbar() {
    const { userState, disconnect, connectWallet } = useContext(UserStoreContext)

    return (
        <div className="w-full flex flex-row justify-between items-center px-12 select-none">
            <Link href="/" className="font-semibold text-xl text-gray-500">
                X-Call-Demo
            </Link>
            <div className="flex flex-row justify-center items-center gap-5 py-4">
                <ActiveLink
                    href="/"
                    className="font-semibold text-xl text-gray-500"
                    activeClassName="font-semibold text-xl text-gray-500 border-b-2 border-gray-500"
                >
                    Home
                </ActiveLink>
                <ActiveLink
                    href="/message"
                    className="font-semibold text-xl text-gray-500"
                    activeClassName="font-semibold text-xl text-gray-500 border-b-2 border-gray-500"
                >
                    Text messages
                </ActiveLink>
            </div>
            {userState.isLoggedIn ? (
                <button
                    onClick={disconnect}
                    className="font-semibold text-xl text-gray-500"
                >
                    {`
                        (${userState.address.slice(0, 5)}...
                        ${userState.address.slice(userState.address.length - 6, userState.address.length - 1)}) Disconnect
                    `}
                </button>
            ) : (
                <button
                    onClick={connectWallet}
                    className="font-semibold text-xl text-gray-500"
                >
                    Connect wallet
                </button>
            )}
        </div>
    )
}
