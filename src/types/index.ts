export type NetworkItem = {
    chainId: number;
    chainName: string;
    btpID: string;
    rpcUrls: string[];
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    blockExplorerUrls: string[];
}

export type NetworkList = {
    [key: string]: NetworkItem;
}

export type AddressesList = {
    [key: string]: {
        [key: string]: string
    }
}
