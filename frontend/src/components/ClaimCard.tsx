import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { writeContract, prepareWriteContract, fetchFeeData, waitForTransaction } from "@wagmi/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { MODE, global, presale } from "@/constants/config";
import { displayRemainTime, formatNumber, getPresaleMsg, isSupportedChain } from "@/utils";
import { formatUnits } from "viem";
import presaleABI from '../constants/abi/presale.json'
import { toast } from "react-toastify";

export default function ClaimCard(props: any) {
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [info, setInfo] = useState({
        totalClaimed: 0,
        userAmounts: 0,
        userClaimed: 0,
        userPending: 0,
        userPendingByChain: 0,
    })

    useEffect(() => {
        try {
            if (Object.keys(props.presaleStatus).length > 0) {
                const presaleStatus = props.presaleStatus

                const _info = {
                    totalClaimed: 0,
                    userAmounts: 0,
                    userClaimed: 0,
                    userPending: 0,
                    userPendingByChain: 0,
                }

                for (let index = 0; index < global.chains.length; index++) {
                    const statusByChain = presaleStatus[global.chains[index].id];
                    if (statusByChain[2].status === "success") {
                        _info.totalClaimed += parseFloat(formatUnits(statusByChain[2].result, 6))
                    }

                    if (address && statusByChain[4].status === "success" && statusByChain[5].status === "success") {
                        _info.userAmounts += parseFloat(formatUnits(statusByChain[4].result[0], 6))
                        _info.userClaimed += parseFloat(formatUnits(statusByChain[4].result[1], 6))
                        _info.userPending += parseFloat(formatUnits(statusByChain[5].result, 6))
                        if (chain && global.chains[index].id === chain.id) {
                            _info.userPendingByChain = parseFloat(formatUnits(statusByChain[5].result, 6))
                        }
                    }
                }
                setInfo(_info)
            }
        } catch (error) {
            console.log('status error: ', error)
        }
    }, [props.presaleStatus, chain, address])

    const [btnMsg, setBtnMsg] = useState("CLAIM NOW")
    const [pending, setPending] = useState(false)

    useEffect(() => {
        if (pending) {
            setBtnMsg("PENDING...")
            return
        }

        if (!address) {
            setBtnMsg("CONNECT WALLET")
            return
        }

        if (!isSupportedChain(chain)) {
            setBtnMsg("UNSUPPORED CHAIN")
            return
        }

        if (props?.presaleMode === MODE.CLIFF_DURATION) {
            setBtnMsg(displayRemainTime(parseInt(props.timer)))
            return
        }

        if (props?.presaleMode !== MODE.VESTING_DURATION) {
            setBtnMsg("COMING SOON")
            return
        }

        if (info.userPendingByChain <= 0) {
            setBtnMsg(`No Pending on ${chain?.name}`)
            return
        }

        setBtnMsg("CLAIM NOW")
    }, [address, chain, pending, info.userPendingByChain, props?.presaleMode, props.timer])

    const handleBtn = async () => {
        if (btnMsg === "CLAIM NOW") {
            setPending(true)
            try {
                const feeData = await fetchFeeData()
                // console.log('[PRINCE] feeData: ', feeData)

                const data = {
                    address: presale[chain ? chain.id : global.chainIds[0]],
                    abi: presaleABI,
                    functionName: 'claimToken',
                }
                const preparedData = await prepareWriteContract({
                    ...data,
                    chainId: chain ? chain.id : global.chainIds[0],
                    gasPrice: feeData.gasPrice ? feeData.gasPrice : undefined
                })
                // console.log('[PRINCE] preparedData: ', preparedData)
                const writeData = await writeContract(preparedData)
                // console.log('[PRINCE] writeData: ', writeData)
                const txPendingData = waitForTransaction(writeData)
                toast.promise(txPendingData, {
                    pending: "Waiting for pending... 👌",
                });

                // console.log('[PRINCE] txPendingData: ', txPendingData)
                const txData = await txPendingData;
                // console.log('[PRINCE] txData: ', txData)
                toast.success(`Successfully claimed $FTL! 👍`)
            } catch (error) {
                toast.error('Something went wrong!')
                // console.log('[PRINCE] preparedData error: ', error)
            }
            if (props.setRefresh !== undefined && props.refresh !== undefined) {
                props.setRefresh(!props.refresh)
            }
            setPending(false)
            return
        }

        toast.warn(btnMsg)
    }

    return (
        <div className="w-full lg:w-1/3 rounded-2xl border-2 border-gray-700 flex flex-col items-center justify-center text-center px-2 py-5 bg-center bg-no-repeat bg-contain bg-[url('/back2.webp')]">
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.95] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-5 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label className="text-yellow-400 text-2xl">{getPresaleMsg(props.presaleMode)}</label>
                </div>
                <div className="flex flex-col items-end">
                    <FontAwesomeIcon icon={faClock} size="xl" />
                    <label className="text-yellow-400 text-lg">{displayRemainTime(parseInt(props.timer))}</label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-10 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Total Claimed </label>
                    <Image src='/token.png' width={35} height={35} alt='ftl' />
                    <label className="text-yellow-500">{formatNumber(info.totalClaimed)} $FTL </label>
                </div>
                <div className="flex flex-col items-center">
                    <label>You Claimed </label>
                    <Image src='/token.png' width={35} height={35} alt='ftl' />
                    <label className="text-yellow-500">{formatNumber(info.userClaimed)} $FTL </label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-10 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Your Remained </label>
                    <Image src='/token.png' width={35} height={35} alt='ftl' />
                    <label className="text-yellow-500">{formatNumber(info.userAmounts - info.userClaimed)} $FTL </label>
                </div>
                <div className="flex flex-col items-center">
                    <label>Your Pending </label>
                    <Image src='/token.png' width={35} height={35} alt='ftl' />
                    <label className="text-yellow-500">{formatNumber(info.userPending)} $FTL </label>
                </div>
            </div>
            <button
                className={`lg:w-3/4 w-full h-[50px] bg-black/[0.95] text-2xl rounded-2xl border-2 my-5 ${pending ? `border-yellow-700 text-gray-800` : `border-yellow-500 text-white`}`}
                disabled={pending}
                onClick={handleBtn}
            >
                {btnMsg}
            </button>
        </div>
    );
}
