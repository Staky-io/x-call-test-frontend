import { NetworkList } from '~/types'

export const NETWORKS: NetworkList = {
    SEPOLIA: {
        chainId: 11155111,
        chainName: 'Sepolia test network',
        btpID: '0xaa36a7.eth2',
        nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'ETH'
        }
    },
    BSC_TESTNET: {
        chainId: 97,
        chainName: 'BSC Testnet',
        btpID: '0x61.bsc',
        nativeCurrency: {
            name: 'Testnet BNB',
            symbol: 'tBNB'
        }
    }
}

export const ADDRESSES = {
    BSC: {
        BMCM: '0xFd82803c9b2E92C628846012c6E5016Ac380f68d',
        BMCS: '0x6AB5fB039ABbEE20bf43F84393E528015686fB04',
        BMC: '0x193eD92257E0773ccBA097e0ba4110E588eb0F1c',
        BMV: '0xFCDD2AB0D0D98c3f74db20a0913c7e3B264dF8a1',
        XCALL: '0x6193c0b12116c4963594761d859571b9950a8686',
        MESSENGER: '0x40a3fd026a5e5527c71eb6c0a87ee7f99a407004'
    },
    ETH: {
        BMCM: '0x39FBbE3AeCbe6ED08baf16e13eFE4aA31550CaA2',
        BMCS: '0xd6298BBB8b8B8EA273C3CB470B273A1cef552Ef3',
        BMC: '0x50DD9479c45085dC64c6F0a0796040C7768f25CE',
        BMV: '0x684ba8F34f9481f7F02aCd4F143506E11AC19E3E',
        XCALL: '0x9B68bd3a04Ff138CaFfFe6D96Bc330c699F34901',
        MESSENGER: '0xd92fb2844e76e455dfd0e20d46bca2cc77558b6e'
    }
}
