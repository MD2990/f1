"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";

export default function RootLayout({ children }) {
	return (
		<ChakraProvider value={defaultSystem} colorModeManager="local">
			<Toaster />
			{children}
		</ChakraProvider>
	);
}
