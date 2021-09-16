import { IconButton } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import {
	HStack,
} from '@chakra-ui/layout';
import { Icon } from '@iconify/react';
('@iconify/react');

import React, { useRef } from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';



export default function UserName() {
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


