("@iconify/react");
import React, { useEffect } from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import Icons from "./Icons";
import { getRandomNumber } from "./Main";
import TheBox from "./TheBox";
// Each player has a unique name, speed
// {i} to be used as index for icons to get a unique one for
export default function PC_Player({ speed, name, i }) {
	const snap = useSnapshot(state);

	useEffect(() => {
		const move = setInterval(() => {
			if (snap.start) {
				// First check for start is false or not

				state.server.map((s) => {
					if (s.speed >= snap.w - 120) {
						state.start = false;
						state.resume = false;
						state.end = true;
					} else s.speed += getRandomNumber(15, 35); // if less  than 950, add random number to speed
				});
			}
		}, 255);

		return () => clearInterval(move);
	}, [speed, snap.start, snap.w]);

	//we need only the icons name to iterate over them via our Icons component
	const icons = [
		"emojione:person-biking-dark-skin-tone",
		"emojione:person-biking-light-skin-tone",
		"emojione:person-biking-medium-dark-skin-tone",
		"emojione:person-biking-medium-light-skin-tone",
	];

	return (
		<TheBox speed={speed}>
			<Icons icon={icons[i]} name={name} />
		</TheBox>
	);
}
