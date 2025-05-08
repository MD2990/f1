"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export default function RootLayout({ children }) {
	return (
		<ChakraProvider value={defaultSystem} colorModeManager="local">
			{children}
		</ChakraProvider>
	);
}
