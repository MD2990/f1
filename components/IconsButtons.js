import { IconButton } from '@chakra-ui/button';
('@iconify/react');

import React from 'react';

export default function IconsButtons({ name, isDisabled, onClick, icon }) {
	return (
		<IconButton
			isDisabled={isDisabled}
			variant='unsyled'
			rounded='full'
			aria-label={name}
			onClick={onClick}
			icon={icon}
		/>
	);
}
