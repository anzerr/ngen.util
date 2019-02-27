
const Gen = require('../index.js'),
	Map = require('image.util'),
	{hsv} = require('color.util'),
	bmp = require('bmp.util'),
	fs = require('fs.promisify');

const scale = 1e9;
const max = 2e3;
const map = new Map({
	width: max,
	height: max,
	mask: {r: 3, g: 2, b: 1, a: 0}
});
const color = (i) => {
	let c = hsv(i, 1, 0.5).toRgb();
	return {r: c[0], g: c[1], b: c[2]};
};

console.log('fill');
console.log('start');
const g = new Gen('8PILspWVIRmYYmxjDX3G');
const step = Math.floor(scale * 0.1);
for (let i = 0; i < scale; i++) {
	let n1 = g.get('8gNz9DrywX:' + i);
	let n = Math.round(n1 * map.width * map.height);
	let x = n % map.width, y = Math.floor(n / (map.width + 1));
	try {
		let c = color(i / scale), c1 = map.data[y][x];
		map.set(y, x, {r: c.r ^ c1.r, g: c.g ^ c1.g, b: c.b ^ c1.b});
		if (i % step === 0) {
			console.log('step', i, scale);
		}
	} catch (e) {
		console.log(x, y);
		throw e;
	}
}

fs.writeFile('data.bmp', bmp.encode({
	width: map.width,
	height: map.height,
	endian: true,
	data: map.toBuffer()
}).data);
