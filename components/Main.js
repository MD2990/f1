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
import { AnimatePresence } from 'framer-motion';

let c = 0;
function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}
const POC = () => {
	return <Center mt='10%'></Center>;
};

const PC = ({ speed, start, name }) => {
	const snap = useSnapshot(state);

	useEffect(() => {
		//	if ( snap.speed === 100) state.start = false;
		speed == 100 && state.results.push({ name: name });

		const move = setInterval(() => {
			if (start) {
				if (speed <= 95) {
					state.server.map((s) => (s.speed += getRandomNumber(1, 7)));
					//state.server[0].speed += num;

					state.server.map((s) => (s.speed > 90 ? (s.speed = 100) : null));
				}
			}
		}, 500);

		return () => clearInterval(move);
	}, [name, speed, start]);

	return (
		<Center mt='10%'>
			<Box
				bg='red'
				w='10'
				h='10'
				rounded='full'
				bottom={`${speed}px`}
				position='relative'>
				<Text textAlign='center'> {name}</Text>
				<Text textAlign='center'> {speed}</Text>
			</Box>
		</Center>
	);
};

const Server = () => {
	const snap = useSnapshot(state);

	return (
		<>
			{snap.server.map((s) => {
				return (
					<Center key={s.id}>
						<PC speed={s.speed} start={s.start} name={s.name} />
					</Center>
				);
			})}
		</>
	);
};

const Buttons = () => {
	const snap = useSnapshot(state);
	return (
		<HStack>
			<Button
				isDisabled={!snap.start || snap.pos == 100}
				onClick={() => {
					const num = getRandomNumber(1, 7);

					if (snap.pos <= 95) {
						state.pos += num;

						if (snap.pos > 90) {
							state.pos = 100;
							state.results.push({ name: 'Majdi' });
						}
					}

					if (snap.pos == 100) {
						state.start = false;
					}
				}}>
				+
			</Button>
			<Button
				onClick={() => {
					state.pos = 0;
					state.pc = 0;
					state.start = false;

					state.server.map((s) => {
						s.speed = 0;
						s.start = false;
						state.results = [];
					});
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
					state.server.map((s) => (s.start = true));
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

const Results = () => {
	const snap = useSnapshot(state);
	return (
		<>
			{snap.results.length &&
				snap.results.map((r, i) => {
					return (
						<Center ml='5%' key={i}>
							<VStack>
								<Text>
									No: {i + 1} {r.name}
								</Text>
							</VStack>
						</Center>
					);
				})}
		</>
	);
};
const Boxes = () => {
	const snap = useSnapshot(state);
	return (
		<Center mt={['5%', '6%', '7%', '8%']}>
			results: <Results />
			<VStack spacing='10'>
				<HStack spacing='12' mb='22px'>
					<Text>{snap.pc}</Text>
					<Text>{snap.pos}</Text>
				</HStack>
				<HStack>
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
	return (
		<Center mt='10%'>
			<Boxes />
			<POC />
			<Server />

			<Buttons />
		</Center>
	);
}
