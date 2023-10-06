import Image from "next/image";
import BuyCard from "./BuyCard";
import Status from "./Status";
import ClaimCard from "./ClaimCard";

export default function Main() {
    return (
        <main className="mb-auto text-white">
            <Status />
            <div className="lg:w-5/6 w-full flex lg:flex-row flex-col justify-center gap-5 items-center mx-auto px-2 my-5">
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back1.webp')] hover:animate-pulse" />
                <BuyCard />
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back3.webp')] hover:animate-pulse" />
            </div>
            <div className="lg:w-5/6 w-full flex lg:flex-row flex-col justify-center gap-5 items-center mx-auto px-2 my-5">
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back1.webp')] hover:animate-pulse" />
                <ClaimCard />
                <div className="hidden w-full lg:w-1/3 h-[450px] lg:flex bg-center bg-no-repeat bg-contain bg-[url('/back3.webp')] hover:animate-pulse" />
            </div>
        </main>
    );
}
