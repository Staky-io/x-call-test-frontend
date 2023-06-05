import { createContext, PropsWithChildren } from 'react'
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
    const [globalState, setGlobalState] = useImmer({ ...defaultState })

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
