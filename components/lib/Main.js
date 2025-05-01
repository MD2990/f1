"use client";
import { Box, Center, VStack } from "@chakra-ui/react";
("@iconify/react");

import React from "react";
import Winner from "./Winner";
import Server from "./Server";
import Buttons from "./Buttons";
import UserBox from "./UserBox";
import { useSnapshot } from "valtio";
import state from "../../store";
import { useEffect } from "react";

export function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}

export default function Main() {
	const snap = useSnapshot(state);
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			state.w = window.innerWidth;
		}

		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<Center mt="2%">
				<Winner />
			</Center>

		
			<VStack
				p={[2, 3, 4, 5]}
				m={[1, 2, 3, 4]}
				spacing={[1, 3, 6, 8]}
				align="flex-end"
			>
				<Server />

				<UserBox />
			</VStack>

			<Buttons />
		</>
	);
}
