# Fastmeal Contracts

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Tokenomics

### FastMeal(FTL)

```text
Name: $FTL
Symbol: $FTL
Decimals: 6

Total Supply: 1.5 billion $FTL tokens
Presale: 30% (450 million $FTL)
Giveaway/Airdrop: 5% (75 million $FTL)
Team: 10% (150 million $FTL)
Uniswap Liquidity: 7% (105 million $FTL)
Treasury: 15% (225 million $FTL)
Advisor: 3% (45 million $FTL)
Reward Pool: 10% (150 million $FTL)
Work-to-Earn: 20% (300 million $FTL)
```

### Presale

```text
Presale Strategy
FastMeal Token Presale
Name: FastMeal
Symbol: $FTL
Decimals: 6
Total Supply: 1.5 billion $FTL tokens
Presale: 30% (450 million $FTL)
     Phase 1:
     - Allocation: 5% of Private and Presale (22,500,000 $FTL)
     - Price per Token: $0.01 per $FTL
     - Total Funds Raised in Phase 1: $225,000
```

## Testnet

### FastMeal

```text
Goerli

    chainId: 10121
    endpoint: 0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23

    OFT: 0x594D65457e3fcd493A5935f9463516F7D4c60383
    _NAME: $FTL
    _SYMBOL: $FTL
    _LZENDPOINT: 0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23

    setTrustedRemoteAddress
    _remoteChainId: 10102
    _remoteAddress: 0x01a4bB54A5C766dAb2c4725d004AC196EE103f1D

BSC Testnet

    chainId: 10102
    endpoint: 0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1

    OFT: 0x01a4bB54A5C766dAb2c4725d004AC196EE103f1D
    _NAME: $FTL
    _SYMBOL: $FTL
    _LZENDPOINT: 0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1

    setTrustedRemoteAddress
    _remoteChainId: 10121
    _remoteAddress: 0x594D65457e3fcd493A5935f9463516F7D4c60383
```

### Presale

```text
Implement- Presale

ProxyAdmin

TransparentUpgradeableProxy(Proxy)
```