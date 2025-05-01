import { proxy } from "valtio";
import { nanoid } from "nanoid";

const state = proxy({
	user: { id: nanoid(), name: "You", speed: 0, start: false },
	userName: "",
	showName: true,
	play: true,
	resume: false,
	rest: false,
	start: false,
	results: [],
	end: false,
	w: 0,
	server: [
		{ id: nanoid(), name: "Donna", speed: 0 },
		{ id: nanoid(), name: "Adelyn", speed: 0 },
		{ id: nanoid(), name: "Teal", speed: 0 },
		{ id: nanoid(), name: "Perry", speed: 0 },
	],
});

export default state;
