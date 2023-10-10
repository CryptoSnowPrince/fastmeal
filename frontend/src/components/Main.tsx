import BuyCard from "./BuyCard";
import Status from "./Status";
import ClaimCard from "./ClaimCard";
import { useEffect, useState } from "react";
import { MODE } from "@/constants/config";
import { getPresaleStatusInfo } from "@/utils";
import { usePresaleStatus } from "@/hooks/usePresaleStatus";

export default function Main() {
    const [timer, setTimer] = useState(0)
    const [presaleMode, setPresaleMode] = useState(MODE.UNKNOWN_PRESALE)
    const [refresh, setRefresh] = useState(false)

    const presaleStatus = usePresaleStatus(refresh)

    useEffect(() => {
        const timerID = setInterval(() => {
            if (timer < 1) {
                const _presaleStatusInfo = getPresaleStatusInfo()
                if (_presaleStatusInfo.mode !== presaleMode) {
                    setPresaleMode(_presaleStatusInfo.mode)
                    setTimer(_presaleStatusInfo.time)
                    return
                }
            }
            setTimer((prevValue) => {
                return prevValue - 1;
            })
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <main className="mb-auto text-white">
            <Status presaleStatus={presaleStatus} />
            <div className="lg:w-5/6 w-full flex lg:flex-row flex-col justify-center gap-5 items-center mx-auto px-2 my-5 lg:mt-[80px]">
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back1.webp')] hover:animate-pulse" />
                {
                    presaleMode === MODE.BEFORE_PRESALE || presaleMode === MODE.ACTIVE_PRESALE ? (
                        <BuyCard presaleMode={presaleMode} timer={timer} setRefresh={setRefresh} refresh={refresh} presaleStatus={presaleStatus} />
                    ) : (
                        <ClaimCard presaleMode={presaleMode} timer={timer} setRefresh={setRefresh} refresh={refresh} presaleStatus={presaleStatus} />
                    )
                }
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back3.webp')] hover:animate-pulse" />
            </div>
        </main>
    );
}
