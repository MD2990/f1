import { Box, VStack, Text } from "@chakra-ui/react";
import React from "react";

export default function TheBox({ speed, children, name }) {
	return (
		<VStack align="center" textAlign={"center"}>
			<Box
				fontWeight={"black"}
				right={`${speed}px`}
				position="relative"
				px="2"
				fontSize={["lg", "xl", "3xl", "6xl"]}
			>
				<Text mt="1" className="names">
					{name}
				</Text>

				{children}
			</Box>
		</VStack>
	);
}
