export function getBTPAddress(address: string, network: string) {
    return `btp://${network}/${address}`
}

export function getNetworkFromBTPAddress(btpAddress: string) {
    return btpAddress.split('/')[1]
}

export function getAddressFromBTPAddress(btpAddress: string) {
    return btpAddress.split('/')[2]
}
