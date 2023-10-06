import Image from "next/image";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faClock } from "@fortawesome/free-solid-svg-icons";

export default function BuyCard() {
    const [usdtAmount, setUsdtAmount] = useState('')
    return (
        <div className="w-full lg:w-1/3 h-[450px] rounded-2xl border-2 border-gray-700 flex flex-col items-center justify-center text-center px-2 bg-center bg-no-repeat bg-contain bg-[url('/back2.png')]">
            <div className="w-full lg:w-3/4 rounded-2xl bg-black/[0.98] border-2 border-gray-700 flex flex-row justify-between items-center text-center px-5 py-2 my-2">
                <div className="flex flex-col items-center">
                    <label>Prsale Timer</label>
                </div>
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faClock} size="xl" />
                    <label>1000 FTL </label>
                </div>
            </div>
            <div className="w-full lg:w-3/4 py-2 bg-black/[0.95] rounded-2xl border-2 border-gray-700 flex flex-col justify-center text-center px-2 mt-2">
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You pay</label>
                    <div className="flex flex-row items-center justify-end gap-2 text-lg text-center">
                        <label>Balance: 1000 USDT </label>
                        <button className="text-yellow-400">Max</button>
                    </div>
                </div>
                <div className="w-full h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                    <input
                        className="bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1"
                        placeholder="value"
                        value={usdtAmount}
                        onChange={(e) => setUsdtAmount(e.target.value)}
                    />
                    <Image src='/usdt.svg' width={35} height={35} alt='logo' />
                </div>
            </div>
            <div className="my-2">
                <FontAwesomeIcon icon={faArrowCircleDown} size="2xl" />
            </div>
            <div className="w-full lg:w-3/4 py-2 rounded-2xl bg-black/[0.95] border-2 border-gray-700 flex flex-col justify-center text-center px-2">
                <div className="w-full px-3 flex flex-row items-center justify-between text-lg text-center">
                    <label className="">You receive</label>
                    <div className="flex flex-row items-center justify-end gap-2 text-lg text-center">
                        <label>Balance: 1000 USDT </label>
                    </div>
                </div>
                <div className="w-full h-[50px] px-3 rounded-xl border-2 border-gray-700 flex flex-row items-center justify-between text-2xl text-center">
                    <input
                        className="bg-transparent focus:border-0 active:border-0 focus:outline-0 mb-1"
                        placeholder="value"
                        value={usdtAmount}
                        onChange={(e) => setUsdtAmount(e.target.value)}
                    />
                    <Image src='/logo.png' width={35} height={35} alt='logo' />
                </div>
            </div>
            <button
                className="lg:w-1/4 w-full h-[50px] bg-black/[0.95] text-2xl rounded-3xl border-2 border-yellow-500 my-5"
            >
                BUY
            </button>
        </div>
    );
}
