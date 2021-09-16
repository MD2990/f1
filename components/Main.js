import {
	Box,
	Center,
	SimpleGrid,
} from '@chakra-ui/layout';
('@iconify/react');

import React, {  } from 'react';
import Winner from './Winner';
import Boxes from './Boxes';
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
			<Center mt='10'>
				<SimpleGrid columns={1} spacing='2rem'>
					<Boxes />

					<Server />

					<Buttons />
				</SimpleGrid>
				<Box
					borderRadius='full'
					bgGradient='linear(to-l, pink.50, pink.100, pink.200)'
					h='40rem'
					w='60px'
					right='765px'
					position='relative'></Box>
			</Center>
		</>
	);
}
