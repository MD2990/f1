import { IconButton } from "@chakra-ui/react";
("@iconify/react");

import React from "react";

export default function IconsButtons({
	name,
	isDisabled,
	onClick,
	icon: Icon,
}) {
	return (
		<IconButton
			fontSize={["sm", "md", "lg", "2xl"]}
			disabled={isDisabled}
			bg="pink.50"
			variant={"subtle"}
			size={["sm", "md", "lg", "2xl"]}
			rounded="full"
			aria-label={name}
			onClick={onClick}
			icon={Icon}
			_hover={{ bg: "pink.100" }}
		>
			{Icon}
		</IconButton>
	);
}
