import Image from "next/image";

export default function Footer() {
    return (
        <footer className='w-full'>
            <div className='lg:w-2/3 w-11/12 flex flex-row text-white items-center justify-between mx-auto my-5'>
                <div className="flex flex-col text-center">
                    <Image src='/gitbook.svg' width={240} height={240} alt='logo' className="lg:w-[220px] w-[70px] my-auto" />
                    <h1 className="lg:text-lg text-sm">Gitbook</h1>
                </div>
                <div className="flex flex-col text-center">
                    <Image src='/telegram.svg' width={240} height={240} alt='logo' className="lg:w-[220px] w-[70px] my-auto" />
                    <h1 className="lg:text-lg text-sm">Telegram</h1>
                </div>
                <div className="flex flex-col text-center">
                    <Image src='/x.svg' width={240} height={240} alt='logo' className="lg:w-[220px] w-[70px] my-auto" />
                    <h1 className="lg:text-lg text-sm">Twitter</h1>
                </div>
                <div className="flex flex-col text-center">
                    <Image src='/audit.svg' width={240} height={240} alt='logo' className="lg:w-[220px] w-[70px] my-auto" />
                    <h1 className="lg:text-lg text-sm">Audit</h1>
                </div>
                <div className="flex flex-col text-center">
                    <Image src='/dextools.svg' width={240} height={240} alt='logo' className="lg:w-[220px] w-[70px] my-auto" />
                    <h1 className="lg:text-lg text-sm">Dextools</h1>
                </div>
            </div >
            <div className='w-full text-white items-center px-5 flex flex-row my-5'>
                <div className="lg:w-1/3 w-2/3 flex flex-row text-center gap-2">
                    <Image src='/logo.svg' width={80} height={80} alt='logo' className="lg:w-[80px] w-[40px] my-auto" />
                    <h1 className="lg:text-lg text-sm my-auto">2023 By Fast Meal Team</h1>
                </div>
                <div className="flex flex-row w-1/3 lg:gap-3 gap-1 lg:justify-center justify-end">
                    <Image src='/instagram_white.svg' width={50} height={50} alt='logo' className="lg:w-[50px] w-[30px] my-auto" />
                    <Image src='/youtube_white.svg' width={50} height={50} alt='logo' className="lg:w-[50px] w-[30px] my-auto" />
                    <Image src='/telegram_white.svg' width={50} height={50} alt='logo' className="lg:w-[50px] w-[30px] my-auto" />
                    <Image src='/x_white.svg' width={50} height={50} alt='logo' className="lg:w-[50px] w-[30px] my-auto" />
                </div>
            </div >
        </footer >
    );
}
