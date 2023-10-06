import Image from "next/image";

export default function Status() {
    return (
        <div className="w-5/6 mx-auto rounded-2xl border-2 gap-4 border-gray-700 flex lg:flex-row flex-col items-center justify-between text-center lg:px-10 px-3 py-3">
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>Total Raised </label>
                <div className="flex flex-col items-center">
                    <Image src='/usdt.svg' width={35} height={35} alt='usdt' />
                    <label>1000 USDT </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>You Invest</label>
                <div className="flex flex-col items-center">
                    <Image src='/usdt.svg' width={35} height={35} alt='logo' />
                    <label>1000 USDT </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>Total Sold</label>
                <div className="flex flex-col items-center">
                    <Image src='/logo.png' width={35} height={35} alt='logo' />
                    <label>1000 $FTL </label>
                </div>
            </div>
            <div className="lg:w-1/6 w-full rounded-2xl border-2 border-gray-700 flex lg:flex-col flex-row lg:justify-center justify-between items-center text-center px-2 py-1">
                <label>You Receive </label>
                <div className="flex flex-col items-center">
                    <Image src='/logo.png' width={35} height={35} alt='logo' />
                    <label>1000 $FTL </label>
                </div>
            </div>
        </div>
    );
}
