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
			isDisabled={isDisabled}
			bg="pink.50"
			variant={"subtle"}
			size={"lg"}
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
