
const Gen = require('../index.js'),
	Map = require('image.util'),
	{hsv} = require('color.util'),
	bmp = require('bmp.util'),
	fs = require('fs.promisify');

const scale = 1e6;
const max = 1e3;
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
for (let i = 0; i < 6; i++) {
	let n1 = g.get('8gNz9DrywX:' + i);
	console.log(i, n1);
}
const step = Math.floor(scale * 0.1);
for (let i = 0; i < scale; i++) {
	let n1 = g.get('8gNz9DrywX:' + i);
	for (let v in n1) {
		let n = Math.round(n1[v] * map.width * map.height);
		let x = n % map.width, y = Math.floor(n / (map.width + 1));
		try {
			let c = color(i / scale), c1 = map.data[y][x];
			map.set(y, x, {r: c.r ^ c1.r, g: c.g ^ c1.g, b: c.b ^ c1.b});
		} catch (e) {
			console.log(x, y);
			throw e;
		}
	}
	if (i % step === 0) {
		console.log('step', i, scale);
	}
}

fs.writeFile('data.bmp', bmp.encode({
	width: map.width,
	height: map.height,
	endian: true,
	data: map.toBuffer()
}).data);
