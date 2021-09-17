import { Box, VStack, Text } from '@chakra-ui/layout';

import React from 'react';

export default function UserBox({ speed, children,name }) {
	return (
		<VStack   >
			<Box    right={`${speed}px`} position='relative' px='2'>
				<Text textAlign='center' mt='1' className='names'>
					{name}
				</Text>
				{children}
			</Box>
		</VStack>
	);
}
