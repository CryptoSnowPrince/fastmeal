import './css/globals.css'
import Image from 'next/image';
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { global } from '@/constants/config';

const chains = global.chains;

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
	name: "Fast Meal",
	description: "Fast Meal",
	url: "https://presale.fastmeal.io",
	icons: ["https://presale.fastmeal.io/logo.png"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
			{ready ? (
				<WagmiConfig config={wagmiConfig}>
					<Component {...pageProps} />
				</WagmiConfig>
			) : <div className='w-full h-[calc(100vh-100px)] flex justify-center items-center'>
				<Image
					src="/logo.png"
					alt="Loading"
					height="128"
					width="128"
					className='animate-pulse'
				/>
			</div>}
		</>
	);
}
