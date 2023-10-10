import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function ClaimCard(presaleMode: any, setRefresh: any) {
    const [usdtAmount, setUsdtAmount] = useState('')
    return (
        <div className="w-full lg:w-1/3 rounded-2xl border-2 border-gray-700 flex flex-col items-center justify-center text-center px-2 py-5 bg-center bg-no-repeat bg-contain bg-[url('/back2.png')]">
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-10 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Vesting Period</label>
                </div>
                <div className="flex flex-col items-center justify-items-end">
                    <FontAwesomeIcon icon={faClock} size="xl" />
                    <label>1000 FTL </label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-10 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Total Claimed </label>
                    <Image src='/logo.png' width={35} height={35} alt='ftl' />
                    <label>1000 FTL </label>
                </div>
                <div className="flex flex-col items-center">
                    <label>You Claimed </label>
                    <Image src='/logo.png' width={35} height={35} alt='ftl' />
                    <label>1000 FTL </label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-10 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Your Remained </label>
                    <Image src='/logo.png' width={35} height={35} alt='ftl' />
                    <label>1000 FTL </label>
                </div>
                <div className="flex flex-col items-center">
                    <label>Your Pending </label>
                    <Image src='/logo.png' width={35} height={35} alt='ftl' />
                    <label>1000 FTL </label>
                </div>
            </div>
            <button
                className="lg:w-1/4 w-full h-[50px] bg-black/[0.98] text-2xl rounded-3xl border-2 border-yellow-500 my-5"
            >
                CLAIM
            </button>
        </div>
    );
}
