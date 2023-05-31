import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { DimensionsProvider } from '@reactivers/hooks'
import { GlobalStoreProvider } from '~/stores/global'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DimensionsProvider>
            <GlobalStoreProvider>
                <Component {...pageProps} />
            </GlobalStoreProvider>
        </DimensionsProvider>
    )
}
