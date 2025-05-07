import { HStack, Separator, VStack } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
("@iconify/react");

import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import IconsButtons from "./IconsButtons";
import { getRandomNumber } from "./Main";
import { MAX_WINDOW_SIZE } from "./constens";

export default function Buttons() {
	const snap = useSnapshot(state);
	const Icons = ({ icon }) => <Icon icon={icon} color="#ff1493" />;
	function handelAccelerate() {
		if (snap.user.speed < snap.w - MAX_WINDOW_SIZE) {
			state.user.speed += getRandomNumber(12, 20);
		} else {
			state.start = false;
			state.resume = false;
			state.end = true;
		}
	}
	function handelRest() {
		state.end = false;
		state.start = false;
		state.user.speed = 0;
		state.server.map((s) => {
			s.speed = 0;
		});
		state.play = true;
		state.resume = false;
	}

	function handelPlay() {
		state.start = true;
		state.resume = !snap.resume;
		state.play = !snap.play;
	}

	function handelPauseResume() {
		state.resume = !snap.resume;
		state.start = !snap.start;
		state.play = !snap.play;
	}

	return (
		<VStack align="center">
			<HStack my="4" spaceX={[1, 2, 4, 6, 8]}>
				<Separator />
				<IconsButtons
					name={"Accelerate"}
					isDisabled={!snap.start}
					onClick={() => handelAccelerate()}
					icon={<Icons icon={"simple-line-icons:speedometer"} />}
				/>

				<IconsButtons
					name={"Rest"}
					isDisabled={snap.rest}
					onClick={() => handelRest()}
					icon={<Icons icon={"mdi:backup-restore"} />}
				/>
				<IconsButtons
					name={"Play"}
					isDisabled={!snap.play}
					onClick={() => handelPlay()}
					icon={<Icons icon={"akar-icons:play"} />}
					// on spaceBar click
					onKeyDown={(e) => {
						if (e.key === " ") {
							handelPlay();
						}
					}}
				/>

				<IconsButtons
					name={"Resume"}
					isDisabled={!snap.resume}
					onClick={() => handelPauseResume()}
					icon={
						!snap.start ? (
							<Icons icon={"radix-icons:resume"} />
						) : (
							<Icons icon={"akar-icons:pause"} />
						)
					}
				/>
			</HStack>
		</VStack>
	);
}
