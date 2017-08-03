//! encodex.js
//! version : 0.1.1
//! author : Alan Hettinger
//! license : MIT

var c = require('./config').config;

// flags
// c[0] - string
// c[1] - integer
// c[2] - negative integer

// validate config

function validateConfig() {
  if (typeof(c) != 'string') return 'Invalid config: A string must be used';
  if (c.length < 12 || c.length > 36) return 'Invalid config: 12 to 36 characters must be used';
  c = c.split('');
  for (i in c) if (c.filter(j => { return c[i] == j }).length > 1) {
    return 'Invalid config: Each character in the config must be unique';
  }
  return 'Config is valid!';
}

// determine base

var base = c.length;

// determine type of encode / decode

function encode(s) {
  if (typeof(s) == 'string') return encodeString(s);
  if (s.toString().replace('.', '').length > 15) {
    console.warn('Warning: Numbers with more than 15 digits may lose precision when encoded.');
  }
  if (typeof(s) == 'number' && s % 1 === 0) return encodeInteger(s);
}

function decode(s) {
  if (s.startsWith(c[0])) return decodeString(s);
  if (s.startsWith(c[1]) || s.startsWith(c[2])) return decodeInteger(s);
}

// encode / decode helper functions

function encodeString(s) {
  return c[0] + s.split('').map(i => {
    i = i.charCodeAt(0).toString(base);
    if (i.length < 2) return c[0] + c[parseInt(i[0], base)];
    return c[parseInt(i[0], base)] + c[parseInt(i[1], base)];
  }).join('');
}

function encodeInteger(s) {
  let flag = (s >= 0) ? c[1] : c[2];
  s = Math.abs(s).toString(base);
  return flag + s.split('').map(i => { return c[parseInt(i, base)] }).join('');
}

function decodeString(s) {
  return s.slice(1).match(/.{2}/g).map(i => {
    i = c.indexOf(i[0]).toString(base) + c.indexOf(i[1]).toString(base);
    return String.fromCharCode(parseInt(i, base));
  }).join('');
}

function decodeInteger(s) {
  let sign = (s[0] == c[1]) ? 1 : -1;
  s = s.slice(1);
  s = s.split('').map(i => { return c.indexOf(i).toString(base) }).join('');
  return sign * parseInt(s, base);
}

module.exports = {
  validateConfig,
  encode,
  decode
};

