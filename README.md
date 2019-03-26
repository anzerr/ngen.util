
### `Intro`
POC into generating numbers with a secret that you can release later

### `Example`

``` javascript
const Gen = require('ngen.util');

const g = new Gen('8PILspWVIRmYYmxjDX3G'); // secret
const publicKey = '8gNz9DrywX', nonce = 1;
console.log(g.get(publicKey + ':' + nonce));
```