import { mainnet, bsc, goerli, bscTestnet } from "wagmi/chains";

export const global = {
    REFETCH_INTERVAL: 10000,
    TOKEN_PRICE_NUM: 1,
    TOKEN_PRICE_DEN: 100,
    PROJECT_ID: '63bae1617d398457d68dcce41ac3cb43',
    START_TIME: 1696800000, // Mon Oct 09 2023 06:20:00 GMT+0900 (Yakutsk Standard Time)
    END_TIME: 1697000000, // Wed Oct 11 2023 13:53:20 GMT+0900 (Yakutsk Standard Time)
    // TODO
    // CLIFF_TIME: 2592000, // 30 * 24 * 3600, // 1 month
    CLIFF_TIME: 86_400, // 24 * 3600, // 1 month
    VESTING_DURATION: 46_656_000, // 18 * 30 * 24 * 3600, // 18 months
    MAX_UINT256: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    PUBLIC_URL: 'https://presale.fastmeal.io/',
    API_URL: 'https://projects.cryptosnowprince.com/api',
    PROJECT: 'fastmeal',
    ACTION: true,
    chains: [mainnet, bsc, goerli, bscTestnet],
    chainIds: [mainnet.id, bsc.id, goerli.id, bscTestnet.id]
}

export const usdt: any = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "0x3F2C908a3C236b4e3c32Bfb37DB823B54d21999B",
    [bscTestnet.id]: "0x904bfC5AaF5A099bdAaF2d5fcDd55dE6Bc6dda29",
}

export const token = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "0xdf038719528eE246A08F01a29678B5d3387EC694",
    [bscTestnet.id]: "0xFce807fD77651E20FAdBAb378f7485D42d54Ac51",
}

export const presale: any = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "0xb500109dCA564e41386935dC19E16d79A4672655",
    [bscTestnet.id]: "0x9CAEAa515f49d13A68e3770eb57522e14e0bc0c3",
}

export const MODE = {
    UNKNOWN_PRESALE: 0,
    BEFORE_PRESALE: 1,
    ACTIVE_PRESALE: 2,
    CLIFF_DURATION: 3,
    VESTING_DURATION: 4,
}
