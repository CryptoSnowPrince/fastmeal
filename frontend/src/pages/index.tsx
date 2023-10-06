import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
		useState(false);
	const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);

	const closeAll = () => {
		setIsNetworkSwitchHighlighted(false);
		setIsConnectHighlighted(false);
	};
	return (
		<>
			<Head>
				<title>Presale | Fast Meal</title>
				<meta
					name="description"
					content="Presale Fast Meal"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/logo.png" />
			</Head>
			<header className='w-full h-[100px] text-black items-center mt-10'>
				<div className='lg:w-2/3 w-11/12 lg:rounded-full rounded-2xl bg-white flex flex-row mx-auto py-2 lg:pl-10 px-2 justify-between'>
					<div className='flex flex-row'>
						<Image src='/logo.png' width={60} height={60} alt='logo' className="w-[60px] h-[60px] my-auto" />
					</div>
					<div className="flex flex-col lg:flex-row bg-black lg:rounded-full rounded-2xl px-2 py-2 gap-2 items-center">
						<w3m-network-button />
						<w3m-button label="Connect" />
					</div>
				</div>
			</header >
		</>
	);
}
