import { proxy } from 'valtio';
import { nanoid } from 'nanoid';

const state = proxy({
	pos: 0,

	pc: 0,
	start: false,
	results: [],
	server: [
		{ id: nanoid(), name: 'A', speed: 0, start: false },
		{ id: nanoid(), name: 'B', speed: 0, start: false },
		{ id: nanoid(), name: 'C', speed: 0, start: false },
		{ id: nanoid(), name: 'D', speed: 0, start: false },
	],
});

export default state;
