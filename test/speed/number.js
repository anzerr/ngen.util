
const util = require('./util.js');
const cap = 100000;

const key = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9
};
let min = 100;

console.log('Number', util.run(cap, () => {
	for (let i = 0; i < 1000; i++) {
		min = Number(Math.floor(Math.random() * 9));
	}
}));

console.log('parseInt', util.run(cap, () => {
	for (let i = 0; i < 1000; i++) {
		min = parseInt(Math.floor(Math.random() * 9), 10);
	}
}));

console.log('key', util.run(cap, () => {
	for (let i = 0; i < 1000; i++) {
		min = key[Math.floor(Math.random() * 9)];
	}
}));

console.log('end', min);
