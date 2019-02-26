
const Gen = require('../index.js'),
	Map = require('image.util'),
	bmp = require('bmp.util'),
	fs = require('fs.promisify');

const hsv2rgb = (h, s, v) => {
	let c = v * s;
	let h1 = h / 60;
	let x = c * (1 - Math.abs((h1 % 2) - 1));
	let m = v - c;
	let rgb = [];

	if (typeof h == 'undefined') {
		rgb = [0, 0, 0];
	} else if (h1 < 1) {
		rgb = [c, x, 0];
	} else if (h1 < 2) {
		rgb = [x, c, 0];
	} else if (h1 < 3) {
		rgb = [0, c, x];
	} else if (h1 < 4) {
		rgb = [0, x, c];
	} else if (h1 < 5) {
		rgb = [x, 0, c];
	} else if (h1 <= 6) {
		rgb = [c, 0, x];
	}

	let r = 255 * (rgb[0] + m);
	let g = 255 * (rgb[1] + m);
	let b = 255 * (rgb[2] + m);

	return {r: r, g: g, b: b};
};

const scale = 1e4;
const map = new Map({
	width: 1000,
	height: 1000,
	mask: {r: 3, g: 2, b: 1, a: 0}
});
console.log('fill');
// map.fill(0, 0, {r: 255, g: 255, b: 255}, map.height, map.width);
console.log('start');
const g = new Gen('8PILspWVIRmYYmxjDX3G');
for (let i = 0; i < scale; i++) {
	// let n = g.get('8gNz9DrywX:' + i);
	let n = Math.random();
	map.fill(
		Math.round(n * 1000),
		i % 1000,
		hsv2rgb(Math.floor((i / scale) * 360), 1, 0.5),
		2
	);
}

fs.writeFile('data.bmp', bmp.encode({
	width: map.width,
	height: map.height,
	endian: true,
	data: map.toBuffer()
}).data);
