export type NetworkList = {
    [key: string]: {
        chainId: number;
        chainName: string;
        btpID: string;
        nativeCurrency: {
            name: string;
            symbol: string;
        };
    };
}
