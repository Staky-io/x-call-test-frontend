import Link from 'next/link'
import { Navbar } from '~/components'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="w-full h-screen flex flex-col justify-center items-center max-w-screen-lg mx-auto text-center gap-2">
                <p className="text-2xl font-medium">This website is meant to test <a href='https://docs.icon.community/' target='_blank' className='text-blue-600 font-bold'>ICON&apos;s xCall</a> inter-chain communication technology.</p>
                <p className="text-2xl font-medium">You can start by sending a simple <Link href='/message' className='text-blue-600 font-bold'>text message</Link> from a chain to another !</p>
            </div>
        </>
    )
}
