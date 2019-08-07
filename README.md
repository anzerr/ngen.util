
### `Intro`
Generating numbers with a secret that you can release later

<div style="text-align:center"><img src="https://raw.githubusercontent.com/anzerr/ngen.util/master/test/data_rand.bmp" /></div>

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/ngen.util.git
npm install --save @anzerr/ngen.util
```

### `Example`
``` javascript
const Gen = require('ngen.util');

const g = new Gen('8PILspWVIRmYYmxjDX3G'); // secret
const publicKey = '8gNz9DrywX', nonce = 1;
console.log(g.get(publicKey + ':' + nonce));
```