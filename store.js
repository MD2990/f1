import { proxy } from "valtio";
import { nanoid } from "nanoid";

// random names
const names = [
	"MIKE",
	"JACK",
	"JOE",
	"BOB",
	"JIM",
	"STEVE",
	"JERRY",
	"BOBBY",
	"GEORGE",
	"CHARLIE",
	"ALAN",
	"EDWARD",
	"FRANK",
	"THOMAS",
	"HERBERT",
	"MICHLE",
	"RONEE",
	"DAVID",
	"CHRIS",
	"KEVIN",
	"MICHAEL",
	"JASON",
	"BRIAN",
	"MATTHEW",
	"ANDREW",
	"JOSHUA",
	"ERIC",
	"JUSTIN",
];

function getRandomName() {
	return names[Math.floor(Math.random() * names.length)];
}

const usedNames = new Set();

function getUniqueRandomName() {
	let name;
	do {
		name = getRandomName();
	} while (usedNames.has(name));
	usedNames.add(name);
	return name;
}

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
		{ id: nanoid(), name: getUniqueRandomName(), speed: 0, color: "pink.500" },
		{ id: nanoid(), name: getUniqueRandomName(), speed: 0, color: "red.300" },
		{ id: nanoid(), name: getUniqueRandomName(), speed: 0, color: "blue.300" },
		{
			id: nanoid(),
			name: getUniqueRandomName(),
			speed: 0,
			color: "yellow.300",
		},
	],
});

export default state;
