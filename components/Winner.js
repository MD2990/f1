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
			? 'Congratulation you won'
			: `Sorry you lost !!! ${results[0].name} Won`;
	let userIsWinner = results[0].name === snap.user.name ? true : false;

	return (
		<>
			{snap.end && (
				<Box
					mx='2'
					bg={userIsWinner ? 'green.300' : 'red.300'}
					p='2'
					borderRadius='xl'>
					<Text
						fontFamily='sans-serif'
						color={userIsWinner ? 'green.50' : 'red.50'}
						fontSize='xl'
						p='2'>
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
						fontSize='lg'
						fontFamily='sans-serif'
						fontWeight='bold'
						key={r.id}
						filter='drop-shadow(8px 8px 10px pink)'>
						<HStack
							spacing='50px'
							overflow='hidden'
							textOverflow='clip'
							whiteSpace='nowrap'>
							<Wrap>
								<WrapItem>
									<Text> {r.name} </Text>
								</WrapItem>

								<WrapItem>
									<Text> Speed: {r.speed}</Text>
								</WrapItem>
							</Wrap>
						</HStack>
					</Center>
				);
			})}
		</>
	);
}
