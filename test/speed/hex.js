
const util = require('./util.js'),
	assert = require('assert');

const cap = 100000;

let getHex = (max = 1) => {
	let o = '';
	for (let i = 0; i < max; i++) {
		o += Math.random().toString(36).substr(2);
	}
	return o;
};
let min = 100;
const size = 9;
const key = {
	0: true,
	1: true,
	2: true,
	3: true,
	4: true,
	5: true,
	6: true,
	7: true,
	8: true,
	9: true
};

console.log('Number match', util.run(cap, () => {
	for (let x = 0; x < 1000; x++) {
		let a = [], hex = getHex(size);
		for (let i in hex) {
			if (hex[i].match(/\d/)) {
				a.push(hex[i]);
			}
		}
		return Number(a.join(''));
	}
}));
console.log('Number match', util.run(cap, () => {
	for (let x = 0; x < 1000; x++) {
		let a = [], hex = getHex(size);
		for (let i in hex) {
			if (key[hex[i]]) {
				a.push(hex[i]);
			}
		}
		return Number(a.join(''));
	}
}));

console.log('pow match', util.run(cap, () => {
	for (let x = 0; x < 1000; x++) {
		let a = 0, p = 1, hex = getHex(size);
		for (let i in hex) {
			if (hex[i].match(/\d/)) {
				a += Number(hex[i]) * p;
				p = p * 10;
			}
		}
		return a;
	}
}));


console.log('pow ref', util.run(cap, () => {
	for (let x = 0; x < 1000; x++) {
		let a = 0, p = 1, hex = getHex(size);
		for (let i in hex) {
			if (key[hex[i]]) {
				a += Number(hex[i]) * p;
				p = p * 10;
			}
		}
		return a;
	}
}));

(() => {
	for (let x = 0; x < 10000; x++) {
		let a = 0, p = 1, hex = getHex(1);
		for (let i in hex) {
			if (key[hex[i]]) {
				a += Number(hex[i]) * p;
				p = p * 10;
			}
		}
		let o = [];
		for (let i in hex) {
			if (key[hex[i]]) {
				o.push(hex[i]);
			}
		}
		assert.equal(Number(o.reverse().join('')), a);
	}
})();

console.log('end', min);
