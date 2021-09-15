import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import {
	Box,
	Center,
	Flex,
	HStack,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/layout';
import { Icon } from '@iconify/react';
('@iconify/react');

import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

import { nanoid } from 'nanoid';
import { useToast } from '@chakra-ui/react';
import { flushLayout } from 'framer-motion';

function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}
let ss = 0;
// Each player has a unique name, speed
// {i} to be used as index for icons to get a unique one for
const PC = ({ speed, name, i }) => {
	const snap = useSnapshot(state);

	useEffect(() => {
		const move = setInterval(() => {
			if (snap.start) {
				// First check for start is false or not

				state.server.map((s) => {
					if (s.speed >= 950) {
						state.start = false;
						state.resume = false;
						state.end = true;
					} else s.speed += getRandomNumber(15, 30); // if less  than 950, add random number to speed
				});
			}
		}, 225);

		return () => clearInterval(move);
	}, [speed, snap.start]);

	//we need only the icons name to iterate over them via our Icons component
	const icons = [
		'emojione:person-biking-dark-skin-tone',
		'emojione:person-biking-light-skin-tone',
		'emojione:person-biking-medium-dark-skin-tone',
		'emojione:person-biking-medium-light-skin-tone',
	];

	return (
		<VStack>
			<Box right={`${speed}px`} position='relative' px='2' ml='200%'>
				<Text textAlign='center' mt='1' className='names'>
					{name}
				</Text>
				<Icons icon={icons[i]} />
			</Box>
		</VStack>
	);
};

const Icons = ({ icon }) => (
	<Icon icon={icon} color='blue' width='82' height='82' rotate={0} />
);

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
	const name = useRef('');

	return (
		<>
			<HStack mr='2' filter='drop-shadow(1px 1px 25px red)'>
				<Input
					fontFamily='sans-serif'
					fontSize='md'
					color='#bb6060'
					className='plc'
					focusBorderColor='#bb6060'
					borderColor='#bb6060'
					variant='flushed'
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
						<Icon icon='bytesize:send' color='#bb6060' width='32' height='32' />
					}
				/>
			</HStack>
		</>
	);
}
const IconsButtons = ({ name, isDisabled, onClick, icon }) => (
	<IconButton
		isDisabled={isDisabled}
		variant='unsyled'
		rounded='full'
		aria-label={name}
		onClick={onClick}
		icon={icon}
	/>
);

const Buttons = () => {
	const snap = useSnapshot(state);
	const Icons = ({ icon }) => (
		<Icon icon={icon} color='#ff1493' width='82' height='82' />
	);
	function handelAccelerate() {
		const num = getRandomNumber(8, 30);

		if (snap.user.speed < 950) {
			state.user.speed += num;
		} else {
			state.start = false;
			state.resume = false;
			state.end = true;
		}
	}
	function handelRest() {
		state.end = false;
		state.start = false;
		state.user.speed = 0;
		state.server.map((s) => {
			s.speed = 0;
		});
		state.play = true;
		state.resume = false;
	}

	function handelPlay() {
		state.start = true;
		state.resume = !snap.resume;
		state.play = !snap.play;
	}

	function handelPauseResume() {
		state.resume = !snap.resume;
		state.start = !snap.start;
		state.play = !snap.play;
	}

	return (
		<SimpleGrid columns={[5, null, 5]} spacing='30px' mt='2%' justify='center' >
			<IconsButtons
				name={'Accelerate'}
				isDisabled={!snap.start}
				onClick={() => handelAccelerate()}
				icon={<Icons icon={'simple-line-icons:speedometer'} />}
			/>
			<IconsButtons
				name={'Rest'}
				isDisabled={snap.rest}
				onClick={() => handelRest()}
				icon={<Icons icon={'mdi:backup-restore'} />}
			/>
			<IconsButtons
				name={'Play'}
				isDisabled={!snap.play}
				onClick={() => handelPlay()}
				icon={<Icons icon={'akar-icons:play'} />}
			/>
			<IconsButtons
				name={'Resume'}
				isDisabled={!snap.resume}
				onClick={() => handelPauseResume()}
				icon={
					!snap.start ? (
						<Icons icon={'radix-icons:resume'} />
					) : (
						<Icons icon={'akar-icons:pause'} />
					)
				}
			/>
		</SimpleGrid>
	);
};

const Winner = () => {
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
};
const Boxes = () => {
	const snap = useSnapshot(state);

	return (
		<VStack>
			<Box right={`${snap.user.speed}px`} position='relative' px='2' ml='200%'>
				<Text className='names' textAlign='center'>
					{snap.user.name}
				</Text>
				<Icon
					icon='emojione:person-biking'
					color='blue'
					width='82'
					height='82'
					rotate={0}
				/>
			</Box>
		</VStack>
	);
};

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
