
const crypto = require('crypto');

const NUM = {
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

class Gen {

	constructor(key, range) {
		this.range = range || 128;
		this.key = key;
		this.cap = this.createMax(Math.floor(this.range / 2));
	}

	createMax(n) {
		return Math.pow(10, n);
	}

	charToInt(n) {
		return Math.round(9 * ((n.charCodeAt(0) - 97) / 25));
	}

	hexToInt(hex) {
		let a = 0, p = 1;
		for (let i in hex) {
			if (NUM[hex[i]]) {
				a += Number(hex[i]) * p;
				p = p * 10;
			}
		}
		return a;
	}

	get(seed) {
		let hash = crypto.createHmac('sha512', this.key);
		hash.update(seed);
		let a = this.hexToInt(hash.digest('hex').substr(0, this.range));
		let cap = this.createMax(Math.ceil(Math.log10(a)) + 1);
		return ((a / cap) - 0.1) / 0.9;
	}

}

module.exports = Gen;
