import { Field, IconButton } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
("@iconify/react");

import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import { toaster } from "@/components/ui/toaster";
export default function UserName() {
	const snap = useSnapshot(state);
	const name = useRef("");

	return (
		<>
			<HStack mr="2" filter="drop-shadow(1px 1px 25px red)">
				<Field.Root required>
					<Field.Label>
						Enter Your Name
						<Field.RequiredIndicator />
					</Field.Label>

					<Input
						textAlign={"center"}
						fontFamily="sans-serif"
						fontSize={["xs", "md", "lg", "xl"]}
						color="#bb6060"
						className="plc"
						_focus={{ borderColor: "#bb6060" }}
						borderColor="#bb6060"
						variant="flushed"
						w="50%"
						placeholder="Your Name"
						size="sm"
						mx="3"
						value={snap.userName}
						onChange={(e) => (state.userName = e.target.value)}
					/>
					<Field.HelperText>Your Name</Field.HelperText>
				</Field.Root>
				<IconButton
					colorPalette={"gray"}
					rounded="full"
					aria-label="Accelerate"
					size={["xs", "sm", "md", "lg"]}
					variant="unsyled"
					onClick={() => {
						if (!snap.userName.length) {
							return toaster.create({
								description: "File saved successfully",
								type: "loading",
							});
						}

						state.user.name = snap.userName;
						state.showName = false;
					}}
				>
					<Icon icon="bytesize:send" color="#bb6060" />
				</IconButton>
			</HStack>
		</>
	);
}
