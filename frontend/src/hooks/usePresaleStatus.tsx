import { multicall } from '@wagmi/core'
import { global, usdt, token, presale } from '../constants/config';
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react';
import presaleABI from '../constants/abi/presale.json'
import erc20ABI from '../constants/abi/token.json'

export function usePresaleStatus(refresh: boolean) {
    const [data, setData] = useState({})
    const { address } = useAccount()
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        const timerID = setInterval(() => {
            setRefetch((prevData) => {
                return !prevData;
            })
        }, global.REFETCH_INTERVAL);

        return () => {
            clearInterval(timerID);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let _data = {}
            for (let index = 0; index < global.chains.length; index++) {
                const contracts: any = [
                    {
                        address: presale[global.chains[index].id],
                        abi: presaleABI,
                        functionName: 'totalFunds'
                    },
                    {
                        address: presale[global.chains[index].id],
                        abi: presaleABI,
                        functionName: 'totalAmounts'
                    },
                    {
                        address: presale[global.chains[index].id],
                        abi: presaleABI,
                        functionName: 'totalClaimed'
                    },
                    {
                        address: usdt[global.chains[index].id],
                        abi: erc20ABI,
                        functionName: 'decimals',
                    }
                ]

                if (address) {
                    contracts.push(
                        {
                            address: presale[global.chains[index].id],
                            abi: presaleABI,
                            functionName: 'userInfo',
                            args: [address],
                        },
                        {
                            address: presale[global.chains[index].id],
                            abi: presaleABI,
                            functionName: 'isClaimable',
                            args: [address],
                        },
                        {
                            address: usdt[global.chains[index].id],
                            abi: erc20ABI,
                            functionName: 'allowance',
                            args: [address, presale[global.chains[index].id]],
                        },
                        {
                            address: usdt[global.chains[index].id],
                            abi: erc20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        },
                        {
                            address: token[global.chains[index].id],
                            abi: erc20ABI,
                            functionName: 'balanceOf',
                            args: [address],
                        },
                    )
                }

                const result = await multicall({
                    chainId: global.chains[index].id,
                    contracts
                })
                console.log(result)
                _data = {
                    ..._data,
                    [global.chains[index].id]: result
                }
            }

            setData(_data)
        };
        fetchData();
        // eslint-disable-next-line
    }, [address, refetch, refresh])

    return data
}