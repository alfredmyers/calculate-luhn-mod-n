# calculate-luhn-mod-n

![GitHub](https://img.shields.io/github/license/alfredmyers/calculate-luhn-mod-n.svg?style=flat)
![Node CI](https://github.com/alfredmyers/calculate-luhn-mod-n/workflows/Node%20CI/badge.svg)
![Node.js Package](https://github.com/alfredmyers/calculate-luhn-mod-n/workflows/Node.js%20Package/badge.svg)

Calculates Luhn Mod N check values

Code based on <https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm>
with minimal modifications.

## Installing

```sh
npm install calculate-luhn-mod-n
```

## API

### Parameters

Parameter | Description
--- | ---
codePointFromCharacter | Function to obtain a code point from a character
characterFromCodePoint | Function to obtain a character from a code point
n | Number of valid characters
input | Input string

## Using

The following example is based on the one found at <https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm>

```javascript
const map = 'abcdef';  // Character to code-point map
const calculateLuhnModN = require('calculate-luhn-mod-n');

const checkCharacter = calculateLuhnModN(character => map.indexOf(character), codePoint => map[codePoint], map.length, 'abcdef'))

// checkCharacter === 'e'
```

The following example uses JavaScript native functions (parseInt and toString) to do the mapping based on radix/mod 36.

```javascript
const calculateLuhnModN = require('calculate-luhn-mod-n');

function appendLuhnMod36(input) {
  const radix = 36;
  
  return input + calculateLuhnModN(character => Number.parseInt(character, radix), codePoint => codePoint.toString(radix).toUpperCase(), radix, input);
}

const output = appendLuhnMod36('1134806PJFB000010013CD18');
// output === '1134806PJFB000010013CD18D'
```

The following example builds upon the previous one and demonstrates a possible way to do validation against an arbitrary regular expression before calculating the check character.

```javascript
const calculateLuhnModN = require('calculate-luhn-mod-n');

function appendLuhnMod36(input) {
  const radix = 36;
  const pattern = /^([A-Z]|\d){4}\d{3}([A-Z]|\d){15}\d{2}$/;

  if (!pattern.test(input)) {
    throw new Error('Invalid identifier format!');
  }

  return input + calculateLuhnModN(character => Number.parseInt(character, radix), codePoint => codePoint.toString(radix).toUpperCase(), radix, input);
}

const output = appendLuhnMod36('1134806PJFB000010013CD18');
// output === '1134806PJFB000010013CD18D'
```
