("@iconify/react");

import React from "react";
import { useSnapshot } from "valtio";
import state from "../../store";
import PC_Player from "./PC_Player";

export default function Server() {
	const snap = useSnapshot(state);

	return (
		<>
			{snap.server.map((s, i) => {
				return (
					<PC_Player
						key={s.id}
						speed={s.speed}
						name={s.name}
						i={i}
						color={s.color}
					/>
				);
			})}
		</>
	);
}
