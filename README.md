# encodex
Specify your own set of ASCII characters to encode strings and integers.

## Current Limitations
- Character set must be 12 to 36 characters (future releases will expand this range)

## Changelog
### 0.1.1
- Created encodex based on the "ace" base 13 encoder
- Removed float encoding to speed up development of string and int encoding

## Usage
Edit config.js to specify your own set of ASCII characters

```javascript
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
```

