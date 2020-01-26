
const Gen = require('../index.js');

console.log('fill');
console.log('start');
const g = new Gen('8PILspWVIRmYYmxjDX3G');
for (let i = 0; i < 6; i++) {
	let n1 = g.get('8gNz9DrywX:' + i);
	console.log(i, n1);
}
