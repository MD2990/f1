import { Box } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
("@iconify/react");

import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";

import TheBox from "./TheBox";
export default function UserBox() {
	const snap = useSnapshot(state);

	return (
		<Box
			display={"flex"}
			borderBottom={"solid 1px #bb6060"}
			w={"100%"}
			justifyContent={"end"}
		>
			<TheBox speed={snap.user.speed} name={snap.user.name} color="green.300">
				<Icon icon="emojione:person-biking" color="blue" rotate={0} />
			</TheBox>
		</Box>
	);
}
