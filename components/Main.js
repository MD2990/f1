import { Button } from '@chakra-ui/button';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/slider';
import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { subscribe } from 'valtio';

let c = 0;
function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}
const POC = () => {
	const snap = useSnapshot(state);
	console.log('POS');
	return <Center mt='10%'></Center>;
};

const PC = () => {
	const snap = useSnapshot(state);

	console.log('PC', snap.pc);
	useEffect(() => {
		if (snap.pos == 100 && snap.pc === 100) state.start = false;
		const move = setInterval(() => {
			const num = getRandomNumber(1, 7);

			if (snap.start) {
				if (snap.pc <= 95) {
					state.pc += num;

					if (snap.pc > 90) {
						state.pc = 100;
					}
				}
			}
		}, 280);

		return () => clearInterval(move);
	}, [snap.pc, snap.start]);
	return <Center mt='10%'></Center>;
};

const Buttons = () => {
	const snap = useSnapshot(state);
	return (
		<HStack>
			<Button
				isDisabled={!snap.start || (snap.pos == 100 && snap.pc === 100)}
				onClick={() => {
					const num = getRandomNumber(1, 7);
					if (snap.pos <= 95) {
						state.pos += num;

						if (snap.pos > 90) {
							state.pos = 100;
						}
					}

					if (snap.pos == 100 && snap.pc < 100) {
						console.log('ok');
					}
				}}>
				+
			</Button>
			<Button
				onClick={() => {
					state.pos = 0;
					state.pc = 0;
					state.start = false;
				}}>
				rest
			</Button>
			<Button
				isDisabled={snap.pc === snap.pos ? false : snap.start}
				onClick={() => {
					state.start = true;

					if (snap.pc === 100 && snap.pos === 100) {
						state.pos = 0;
						state.pc = 0;
						state.start = true;
					}
				}}>
				{snap.pc === 100 && snap.pos === 100 ? 'Play Again' : 'Start'}
			</Button>

			<Button
				isDisabled={!state.start}
				onClick={() => {
					state.start = !snap.start;
				}}>
				Pause
			</Button>
		</HStack>
	);
};

const Boxes = () => {
	const snap = useSnapshot(state);
	return (
		<Center mt={['5%', '6%', '7%', '8%']}>
			<VStack spacing='10'>
				<HStack spacing='12' mb='22px'>
					<Text>{snap.pc}</Text>
					<Text>{snap.pos}</Text>
				</HStack>
				<HStack>
					<Slider
						id='pc'
						aria-label='slider-ex-3'
						defaultValue={0}
						value={snap.pc}
						orientation='vertical'
						minH='32'>
						<SliderTrack>
							<SliderFilledTrack />
						</SliderTrack>
					</Slider>
					<Box
						bg='red'
						w='10'
						h='10'
						rounded='full'
						bottom={`${snap.pc}px`}
						position='relative'>
						<Text textAlign='center'> PC</Text>{' '}
					</Box>

					<Box
						bg='red'
						w='10'
						h='10'
						rounded='full'
						bottom={`${snap.pos}px`}
						position='relative'>
						<Text textAlign='center'> PC</Text>{' '}
					</Box>
					<Slider
						id='pos'
						aria-label='slider-ex-3'
						defaultValue={0}
						value={snap.pos}
						orientation='vertical'
						minH='32'>
						<SliderTrack>
							<SliderFilledTrack />
						</SliderTrack>
					</Slider>
				</HStack>
			</VStack>
		</Center>
	);
};
export default function Main() {
	console.log('main');

	return (
		<Center mt='10%'>
			<Boxes />
			<POC />
			<PC />
			<Buttons />
		</Center>
	);
}
