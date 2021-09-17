import {
	Box,
	Center,
	SimpleGrid,
	Text,
	VStack,
} from '@chakra-ui/layout';
('@iconify/react');

import React, {  } from 'react';
import Winner from './Winner';
import UserBox from './UserBox';
import Server from './Server';
import Buttons from './Buttons';

export function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}

export default function Main() {
	return (
		<>
			<Center mt='2%'>
				<Winner />
			</Center>

			<VStack  align='flex-end' pr='2' spacing='2'>
				<Server />

				<UserBox />
			</VStack>
			<Buttons />
		</>
	);
}
