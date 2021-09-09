import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import { StyledStepper } from '@chakra-ui/number-input';
import {
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
} from '@chakra-ui/slider';
import React, { useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

function getRandomNumber(min, max) {
	const number = Math.floor(Math.random() * (max - min) + min);

	return number;
}

const PC = ({ speed, start, name }) => {
	const snap = useSnapshot(state);

	useEffect(() => {
		const move = setInterval(() => {
			if (snap.start) {
				// First check for start is false or not

				state.server.map((s) => {
					if (s.speed >= 100) {
						state.start = false;
						state.resume = false;
					} else s.speed += getRandomNumber(1, 7); // if less  than 100, add random number to speed
				});
			}
		}, 500);

		return () => clearInterval(move);
	}, [speed, snap.start]);

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

function UserName() {
	const snap = useSnapshot(state);
	const ref = useRef('');
	const name = useRef('');

	const handleChange = (e) => {
		const name = (ref.current = e.target.value);
		return name;
	};
	console.log(name.current.value);

	return (
		<>
			<VStack>
				<Text mb='8px'>Name: {snap.user.name} </Text>

				<br />
				<Input
					ml='5'
					mr='5'
					w='90px'
					ref={(e) => (name.current = e)}
					placeholder='Here is a sample placeholder'
					size='sm'
				/>
				<Button
					onClick={() => {
						name.current.value
							? (state.user.name = name.current.value)
							: snap.user.name;
						state.showName = false;
					}}>
					{' '}
					ok{' '}
				</Button>
			</VStack>
		</>
	);
}

const Buttons = () => {
	const snap = useSnapshot(state);
	return (
		<HStack>
			<Button
				isDisabled={!snap.start}
				onClick={() => {
					const num = getRandomNumber(1, 7);

					if (snap.user.speed < 100) {
						state.user.speed += num;
					} else {
						state.start = false;
						state.resume = false;
					}
				}}>
				+
			</Button>
			<Button
				isDisabled={snap.rest}
				onClick={() => {
					state.start = false;
					state.user.speed = 0;
					state.server.map((s) => {
						s.speed = 0;
					});
					state.play = true;
					state.resume = false;
				}}>
				rest
			</Button>
			<Button
				isDisabled={!snap.play}
				onClick={() => {
					state.start = true;
					state.resume = !snap.resume;
					state.play = !snap.play;
				}}>
				Play
			</Button>

			<Button
				isDisabled={!snap.resume}
				onClick={() => {
					state.resume = !snap.resume;
					state.start = !snap.start;
					state.play = !snap.play;
				}}>
				{!snap.start ? 'Resume' : 'Pause'}
			</Button>

			<Button onClick={() => (state.showName = true)}>Change Name</Button>
		</HStack>
	);
};

const Results = () => {
	const snap = useSnapshot(state);

	let ss = [...snap.server, snap.user];

	let dd = ss.sort((a, b) =>
		a.speed < b.speed ? 1 : b.speed < a.speed ? -1 : 1,
	);

	return (
		<>
			{dd.map((r) => {
				return (
					<Center ml='5%' key={r.id}>
						<>
							<VStack>
								<Text> {r.name} </Text>
								<Text> Speed: {r.speed}</Text>
							</VStack>
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
		<Center mt={['5%', '6%', '7%', '8%']}>
			<VStack spacing='2'>
				{/* 	<HStack spacing='12' mb='22px'>
					<Text>{snap.user.speed}</Text>
					<Text>{snap.user.speed}</Text>
				</HStack> */}
				<HStack justify='center' w='2xl'>
					<Results />
					<Box
						bg='red'
						w='10'
						h='10'
						rounded='full'
						bottom={`${snap.user.speed}px`}
						position='relative'>
						<Text textAlign='center'> {snap.user.name}</Text>{' '}
					</Box>
					<Slider
						id='user'
						aria-label='slider-ex-3'
						defaultValue={0}
						value={snap.user.speed}
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
	const snap = useSnapshot(state);

	return (
		<Center mt='10%'>
			{snap.showName && <UserName />}

			<Boxes />
			<Server />
			<Buttons />
		</Center>
	);
}
