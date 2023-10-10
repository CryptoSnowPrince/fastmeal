import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Head from "next/head";
import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { getWalletWarningMsg } from "@/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	const { address } = useAccount()
	const { chain } = useNetwork()

	useEffect(() => {
		const waring = getWalletWarningMsg(chain, address);
		if (waring) {
			toast.warn(waring)
		}
	}, [address, chain])

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
			<div className="flex flex-col h-screen">
				<Header />
				<Main />
				<Footer />
				<ToastContainer pauseOnFocusLoss={true} position="top-right" />
			</div>
		</>
	);
}
