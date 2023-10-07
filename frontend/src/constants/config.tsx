import { mainnet, bsc, goerli, bscTestnet } from "wagmi/chains";

export const global = {
    REFETCH_INTERVAL: 10000,
    TOKEN_PRICE_NUM: 777,
    TOKEN_PRICE_DEN: 10000000000,
    PROJECT_ID: '63bae1617d398457d68dcce41ac3cb43',
    START_TIME: 1696680000, // 10.7.00.00.00.
    END_TIME: 1696690000, // 10.8.00.00.00.
    CLIFF_TIME: 30 * 24 * 3600, // 18 month
    VESTING_DURATION: 18 * 30 * 24 * 3600, // 18 months
    MAX_UINT256: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    PUBLIC_URL: 'https://presale.fastmeal.io/',
    API_URL: 'https://projects.cryptosnowprince.com/api',
    PROJECT: 'shubex',
    ACTION: true,
    chains: [mainnet, bsc, goerli, bscTestnet]
}

export const usdt = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "",
    [bscTestnet.id]: "",
}

export const token = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "",
    [bscTestnet.id]: "",
}

export const presale = {
    [mainnet.id]: "",
    [bsc.id]: "",
    [goerli.id]: "",
    [bscTestnet.id]: "",
}

export const MODE = {
    BEFORE_PRESALE: 0,
    ACTIVE_PRESALE: 1,
    CLIFF_DURATION: 2,
    VESTING_DURATION: 3,
}
