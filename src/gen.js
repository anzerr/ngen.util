
const crypto = require('crypto');

class Gen {

	constructor(key, range) {
		this.range = range || 128;
		this.key = key;
		this.cap = this.createMax(Math.floor(this.range / 2) + 1);
	}

	createMax(n) {
		return Number('1' + Array(n).join('0'));
	}

	charToInt(n) {
		return Math.round(9 * ((n.charCodeAt(0) - 97) / 25));
	}

	hexToInt(hex) {
		let a = [];
		for (let i in hex) {
			if (hex[i].match(/\d/)) {
				a.push(hex[i]);
			}
		}
		return Number(a.join(''));
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
