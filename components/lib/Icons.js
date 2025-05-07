import { Box, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
("@iconify/react");

import React from "react";

function Icons({ icon, name, color }) {
	return (
		<Box>
			<Text
				fontSize={["sm", "md", "lg", "xl"]}
				color={color}
				fontWeight={"lighter"}
			>
				{name}
			</Text>
			<Text fontSize={["sm", "lg", "3xl", "6xl"]}>
				<Icon icon={icon} color="blue" rotate={0} />
			</Text>
		</Box>
	);
}
export default React.memo(Icons);
