import { Box, Text, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
("@iconify/react");

import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";

import TheBox from "./TheBox";
export default function UserBox() {
	const snap = useSnapshot(state);

	return (
		<TheBox speed={snap.user.speed} name={snap.user.name}>
			<Icon icon="emojione:person-biking" color="blue" rotate={0} />
		</TheBox>
	);
}
