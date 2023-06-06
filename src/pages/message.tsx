import { MessengerInput, Navbar } from '~/components'

export default function Messages() {
    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <MessengerInput />
            </div>
        </>
    )
}
