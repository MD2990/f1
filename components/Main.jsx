import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import {
	Box,
	Center,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/layout';
import { Icon } from '@iconify/react';
('@iconify/react');

import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

import { nanoid } from 'nanoid';

function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}

const PC = ({ speed, name, i }) => {
	const snap = useSnapshot(state);

	useEffect(() => {
		const move = setInterval(() => {
			if (snap.start) {
				// First check for start is false or not

				state.server.map((s) => {
					if (s.speed >= 750) {
						state.start = false;
						state.resume = false;
						state.end = true;
					} else s.speed += getRandomNumber(18, 25); // if less  than 100, add random number to speed
				});
			}
		}, 200);

		return () => clearInterval(move);
	}, [speed, snap.start]);
	const icons = [
		<Icon
			icon='emojione:person-biking-dark-skin-tone'
			color='blue'
			width='64'
			height='64'
			rotate={0}
			key={nanoid()}
		/>,
		<Icon
			icon='emojione:person-biking-light-skin-tone'
			color='blue'
			width='64'
			height='64'
			rotate={0}
			key={nanoid()}
		/>,
		<Icon
			icon='emojione:person-biking-medium-dark-skin-tone'
			color='blue'
			width='64'
			height='64'
			rotate={0}
			key={nanoid()}
		/>,
		<Icon
			icon='emojione:person-biking-medium-light-skin-tone'
			color='blue'
			width='64'
			height='64'
			rotate={0}
			key={nanoid()}
		/>,
	];

	return (
		<VStack>
			<Box right={`${speed}px`} position='fixed' px='4' mr='10%'>
				{icons[i]}
				<Text textAlign='center' mt='-1'>
					{name}
				</Text>
			</Box>
		</VStack>
	);
};

const Server = () => {
	const snap = useSnapshot(state);

	return (
		<>
			{snap.server.map((s, i) => {
				return (
					<PC key={s.id} speed={s.speed} start={s.start} name={s.name} i={i} />
				);
			})}
		</>
	);
};

function UserName() {
	const snap = useSnapshot(state);
	const ref = useRef('');
	const name = useRef('');

	return (
		<>
			<VStack>
				<Input
					w='100px'
					ref={(e) => (name.current = e)}
					placeholder='Your Name'
					size='sm'
				/>

				<IconButton
					variant='unsyled'
					rounded='full'
					aria-label='Accelerate'
					onClick={() => {
						const names = name.current.value || 'You';
						names
							? (state.user.name =
									names.length > 7
										? names.substring(0, 5)
										: names.toUpperCase())
							: snap.user.name;
						state.showName = false;
					}}
					icon={
						<Icon icon='bytesize:send' color='blue' width='32' height='32' />
					}
				/>
			</VStack>
		</>
	);
}

const Buttons = () => {
	const snap = useSnapshot(state);
	return (
		<>
			<SimpleGrid columns={[1, null, 5]} spacing='30px' mt='3%'>
				<IconButton
					isDisabled={!snap.start}
					variant='unsyled'
					rounded='full'
					aria-label='Accelerate'
					onClick={() => {
						const num = getRandomNumber(10, 25);

						if (snap.user.speed < 750) {
							state.user.speed += num;
						} else {
							state.start = false;
							state.resume = false;
							state.end = true;
						}
					}}
					icon={
						<Icon
							icon='simple-line-icons:speedometer'
							color='#B22222	'
							width='62'
							height='62'
						/>
					}
				/>
				<IconButton
					isDisabled={snap.rest}
					variant='unsyled'
					rounded='full'
					aria-label='Accelerate'
					onClick={() => {
						state.end = false;
						state.start = false;
						state.user.speed = 0;
						state.server.map((s) => {
							s.speed = 0;
						});
						state.play = true;
						state.resume = false;
					}}
					icon={
						<Icon
							icon='mdi:backup-restore'
							color='#B22222	'
							width='62'
							height='62'
						/>
					}
				/>
				<IconButton
					isDisabled={!snap.play}
					variant='unsyled'
					rounded='full'
					aria-label='Accelerate'
					onClick={() => {
						state.start = true;
						state.resume = !snap.resume;
						state.play = !snap.play;
					}}
					icon={
						<Icon
							icon='akar-icons:play'
							color='#B22222	'
							width='62'
							height='62'
						/>
					}
				/>
				<IconButton
					isDisabled={!snap.resume}
					variant='unsyled'
					rounded='full'
					aria-label='Accelerate'
					onClick={() => {
						state.resume = !snap.resume;
						state.start = !snap.start;
						state.play = !snap.play;
					}}
					icon={
						!snap.start ? (
							<Icon
								icon='radix-icons:resume'
								color='#B22222	'
								width='62'
								height='62'
							/>
						) : (
							<Icon
								icon='akar-icons:pause'
								color='#B22222	'
								width='62'
								height='62'
							/>
						)
					}
				/>
			</SimpleGrid>
		</>
	);
};

const Winner = () => {
	const snap = useSnapshot(state);

	let ss = [...snap.server, snap.user];

	let results = ss.sort((a, b) =>
		a.speed < b.speed ? 1 : b.speed < a.speed ? -1 : 1,
	);

	return (
		<>
			{snap.end && (
				<Box>
					<Text>{results[0].name} Won !!! </Text>
				</Box>
			)}
			{results.map((r) => {
				return (
					<Center ml='5%' key={r.id}>
						<>
							<HStack>
								<Text> {r.name} </Text>
								<Text> Speed: {r.speed}</Text>
							</HStack>
						</>
					</Center>
				);
			})}
		</>
	);
};
const Boxes = () => {
	const snap = useSnapshot(state);

	return (
		<VStack>
			<Box right={`${snap.user.speed}px`} position='fixed' px='4' mr='10%'>
				<Text textAlign='center'>{snap.user.name}</Text>
				<Icon
					icon='emojione:person-biking'
					color='blue'
					width='64'
					height='64'
					rotate={0}
				/>
			</Box>
		</VStack>
	);
};
export default function Main() {
	const snap = useSnapshot(state);

	return (
		<>
			<Center mt='2%'>
				<Stack align='flex-start' mb='-28' px='24' pt='2'>
					{snap.showName && <UserName />}
				</Stack>
				<Winner />
			</Center>
			<Center mt='10'>
				<SimpleGrid columns={1} spacing='6rem'>
					<Boxes />

					<Server />

					<Buttons />
				</SimpleGrid>
			</Center>
		</>
	);
}
