import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Head from "next/head";

export default function Home() {
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
			</div>
		</>
	);
}
