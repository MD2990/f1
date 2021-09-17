import { Box, Center, HStack, Text, Wrap, WrapItem } from '@chakra-ui/layout';
('@iconify/react');

import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import UserName from './UserName';

export default function Winner() {
	const snap = useSnapshot(state);

	const jointResults = [...snap.server, snap.user];

	const results = jointResults.sort((a, b) =>
		a.speed < b.speed ? 1 : b.speed < a.speed ? -1 : 1,
	);

	const theWinner =
		results[0].name === snap.user.name
			? 'You won !!!'
			: `You lost, ${results[0].name} Won`;
	let userIsWinner = results[0].name === snap.user.name ? true : false;

	return (
		<>
			{snap.end && (
				<Box
					mx='1'
					bg={userIsWinner ? 'green.300' : 'red.300'}
					p='1'
					borderRadius='xl'>
					<Text
						fontFamily='sans-serif'
						color={userIsWinner ? 'green.50' : 'red.50'}
						fontSize='sm'
						p='1'>
						{theWinner}{' '}
					</Text>
				</Box>
			)}

			{snap.showName && <UserName />}

			{results.map((r) => {
				return (
					<Center
						borderRadius='full'
						userSelect='none'
						p='3'
						bg='red.400'
						mx='1%'
						color='red.50'
						fontSize='sm'
						fontFamily='sans-serif'
						fontWeight='light'
						filter='drop-shadow(8px 8px 10px pink)'
						key={r.id}>
						<HStack
							spacing='5px'
							overflow='hidden'
							textOverflow='clip'
							whiteSpace='nowrap'>
							<Text> {r.name} </Text>

							<Text> {r.speed}</Text>
						</HStack>
					</Center>
				);
			})}
		</>
	);
}
