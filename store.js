import { proxy } from 'valtio';

const state = proxy({
	pos: 0,
	pc: 0,
	start: false,

});

export default state;
