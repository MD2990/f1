import {
	Box,
	Text,
	VStack,
} from '@chakra-ui/layout';
import { Icon } from '@iconify/react';
('@iconify/react');

import React, {  } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

export default function Boxes() {

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
}
