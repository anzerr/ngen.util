
const crypto = require('crypto');

class Gen {

	constructor(key) {
		this.key = key;
	}

	getRoll(seed) {
		let hmac = crypto.createHmac('sha512', this.key);
		hmac.update(seed);
		const hash = hmac.digest('hex');
		let roll = null, block = 0, blockSize = 5;
		while (roll === null) {
			if (block === 25) {
				roll = parseInt(hash.substring(125, 128), 16) / 1000000;
			} else {
				let b = parseInt(hash.substring(block * blockSize, (block + 1) * blockSize), 16);
				if (b < 1000000) {
					roll = b / 1000000;
				}
				block++;
			}
		}
		return roll;
	}

	get(seed) {
		const hmac = crypto.createHmac('sha512', this.key), out = [];
		hmac.update(seed);
		const hash = hmac.digest();
		let i = 0;
		while (i <= (hash.length - 4)) {
			out.push(hash.readUIntBE(i, 4) / 0xffffffff);
			i += 4;
		}
		return out;
	}

}

module.exports = Gen;
