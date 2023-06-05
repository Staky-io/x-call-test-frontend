import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { DimensionsProvider } from '@reactivers/hooks'
import { GlobalStoreProvider } from '~/stores/global'
import { UserStoreProvider } from '~/stores/user'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DimensionsProvider>
            <UserStoreProvider>
                <GlobalStoreProvider>
                    <Component {...pageProps} />
                </GlobalStoreProvider>
            </UserStoreProvider>
        </DimensionsProvider>
    )
}
