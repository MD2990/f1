/* import Head from 'next/head';
import Main from '../components/Main';

export default function Home() {
	return (
		<>
			<Head>
				<title>Bicycle racing game </title>
				<meta name='description' content='Simple bicycle racing game ' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Main />
		</>
	);
}
 */

import { Inter } from "next/font/google";
import Provider from "./provider";
import { Toaster } from "@chakra-ui/react";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }) {
	return (
		<html className={inter.className} suppressHydrationWarning>
			<head />
			<body>
				<Provider>
					{children}
					<Toaster />
				</Provider>
			</body>
		</html>
	);
}
