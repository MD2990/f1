import { proxy } from 'valtio';
import { nanoid } from 'nanoid';

const state = proxy({
	user: { id: nanoid(), name: 'You', speed: 0, start: false },
	showName: true,
	play: true,
	resume: false,
	rest: false,
	start: false,
	results: [],
	userName: 'Your Name',
	server: [
		{ id: nanoid(), name: 'A', speed: 0, auto: 0, start: false },
		{ id: nanoid(), name: 'B', speed: 0, auto: 0, start: false },
		{ id: nanoid(), name: 'C', speed: 0, auto: 0, start: false },
		{ id: nanoid(), name: 'D', speed: 0, auto: 0, start: false },
	],
});

export default state;
