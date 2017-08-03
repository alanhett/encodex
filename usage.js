var encodex = require('./encodex');

// validating configuration
console.log(encodex.validateConfig()); // Config is valid!

// encoding a string
s = encodex.encode('Hello world!');
console.log(s); // A1A3F4A4A4DC3464D414A3EC4

// decoding a string
s = encodex.decode(s);
console.log(s); // Hello world!

// encoding an integer
i = encodex.encode(123456789);
console.log(i); // BDFEB3544

// decoding an integer
i = encodex.decode(i);
console.log(i); // 123456789