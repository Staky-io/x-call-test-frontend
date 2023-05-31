import { createContext, PropsWithChildren } from 'react'
import { useDimensions } from '@reactivers/hooks'
import { useImmer, Updater } from 'use-immer'

type GlobalState = {
    isLoading: boolean
    isMobile: boolean
    isDarkMode: boolean
}

type GlobalStore = {
    globalState: GlobalState,
    setGlobalState: Updater<{ isLoading: boolean; isMobile: boolean; isDarkMode: boolean; }>
}

const defaultState = {
    isLoading: true,
    isMobile: false,
    isDarkMode: true
}

const GlobalStoreContext = createContext({ globalState: defaultState } as GlobalStore)

const GlobalStoreProvider = ({ children }: PropsWithChildren) => {
    const dimensions = useDimensions()
    const [globalState, setGlobalState] = useImmer({ ...defaultState })

    console.log('globalState', globalState)
    console.log('dimensions', dimensions)

    return (
        <GlobalStoreContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalStoreContext.Provider>
    )
}

export {
    GlobalStoreContext,
    GlobalStoreProvider
}
