import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faClock } from "@fortawesome/free-solid-svg-icons";
import { useAccount, useNetwork } from "wagmi";
import { writeContract } from "@wagmi/core"
import { displayRemainTime, formatNumber, getMaxValue, getPresaleMsg, getWalletWarningMsg } from "@/utils";
import { toast } from "react-toastify";
import { formatUnits } from "viem";
import { global } from "@/constants/config";

export default function BuyCard(props: any) {
    const [usdtAmount, setUsdtAmount] = useState('')
    const [tokenAmount, setTokenAmount] = useState('')
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [info, setInfo] = useState({
        usdtRawBalance: "",
        usdtBalance: 0,
        tokenRawBalance: "",
        tokenBalance: 0,
        usdtRawAllowance: "",
        usdtAllowance: 0,
    })

    useEffect(() => {
        if (chain && address) {
            try {
                if (Object.keys(props.presaleStatus).length > 0) {
                    const presaleStatus = props.presaleStatus

                    const _info = {
                        usdtRawBalance: "",
                        usdtBalance: 0,
                        tokenRawBalance: "",
                        tokenBalance: 0,
                        usdtRawAllowance: "",
                        usdtAllowance: 0,
                    }

                    const statusByChain = presaleStatus[chain.id];
                    if (statusByChain[6].status === "success" && statusByChain[3].status === "success") {
                        _info.usdtRawAllowance = statusByChain[6].result
                        _info.usdtAllowance = parseFloat(formatUnits(statusByChain[6].result, statusByChain[3].result))
                    }

                    if (statusByChain[7].status === "success" && statusByChain[3].status === "success") {
                        _info.usdtRawBalance = statusByChain[7].result
                        _info.usdtBalance = parseFloat(formatUnits(statusByChain[7].result, statusByChain[3].result))
                    }

                    if (statusByChain[8].status === "success" && statusByChain[3].status === "success") {
                        _info.tokenRawBalance = statusByChain[8].result
                        _info.tokenBalance = parseFloat(formatUnits(statusByChain[8].result, statusByChain[3].result))
                    }
                    setInfo(_info)
                }
            } catch (error) {
                console.log('status error: ', error)
            }
        }
    }, [props.presaleStatus, chain, address])

    return (
        <div className="w-full lg:w-1/3 h-[450px] rounded-2xl border-2 border-gray-700 flex flex-col items-center justify-center text-center px-2 bg-center bg-no-repeat bg-contain bg-[url('/back2.png')]">
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.95] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-5 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label className="text-yellow-400 text-2xl">{getPresaleMsg(props.presaleMode)}</label>
                </div>
                <div className="flex flex-col items-end">
                    <FontAwesomeIcon icon={faClock} size="xl" />
                    <label className="text-yellow-400 text-xl">{displayRemainTime(parseInt(props.timer))}</label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 py-2 bg-black/[0.95] rounded-2xl border-2 border-gray-700 flex flex-col justify-center text-center px-2 mt-2">
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You pay</label>
                </div>
                <div className="w-full h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                    <input
                        className="bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1"
                        placeholder="0"
                        value={usdtAmount}
                        onChange={(e) => {
                            const usdtValue = parseFloat(e.target.value)
                            if (usdtValue && usdtValue > 0) {
                                const tokenValue = usdtValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM;
                                setTokenAmount(tokenValue.toFixed(2))
                            } else {
                                setTokenAmount('0')
                            }
                            setUsdtAmount(e.target.value)
                        }}
                    />
                    <Image src='/usdt.svg' width={35} height={35} alt='logo' />
                </div>
                <div className="w-full px-3 flex flex-row items-center justify-end text-sm text-center">
                    <div className="flex flex-row items-center justify-end gap-2 text-center">
                        <label>Balance: {formatNumber(info.usdtBalance)} </label>
                        <button
                            className="text-yellow-400"
                            onClick={(e) => {
                                const maxValue = getMaxValue(info.usdtBalance, false);
                                if (maxValue && maxValue > 0) {
                                    setUsdtAmount(maxValue.toFixed(2))
                                    setTokenAmount((maxValue * global.TOKEN_PRICE_DEN / global.TOKEN_PRICE_NUM).toFixed(2))
                                }
                            }}
                        >Max</button>
                    </div>
                </div>
                <div className="my-0">
                    <FontAwesomeIcon icon={faArrowCircleDown} size="xl" />
                </div>
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You receive</label>
                </div>
                <div className="w-full h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                    <input
                        className="bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1"
                        placeholder="0"
                        value={tokenAmount}
                        onChange={(e) => {
                            const tokenValue = parseFloat(e.target.value)
                            if (tokenValue && tokenValue > 0) {
                                const usdtValue = tokenValue * global.TOKEN_PRICE_NUM / global.TOKEN_PRICE_DEN;
                                setUsdtAmount(usdtValue.toFixed(2))
                            } else {
                                setUsdtAmount('0')
                            }
                            setTokenAmount(e.target.value)
                        }}
                    />
                    <Image src='/logo.png' width={35} height={35} alt='logo' />
                </div>
                <div className="w-full px-3 flex flex-row items-center justify-end text-sm text-center">
                    <div className="flex flex-row items-center justify-end gap-2 text-center">
                        <label>Balance: {formatNumber(info.tokenBalance)} </label>
                    </div>
                </div>
            </div>
            <button
                className="lg:w-3/4 w-full h-[50px] bg-black/[0.95] text-2xl rounded-2xl border-2 border-yellow-500 my-5"
            >
                BUY
            </button>
        </div>
    );
}
