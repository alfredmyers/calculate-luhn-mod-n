'use strict';

const calculateLuhnModN = require('./index');

const radix = 36;
const calculateLuhnMod36 = calculateLuhnModN.bind(undefined, character => Number.parseInt(character, radix), codePoint => codePoint.toString(radix).toUpperCase(), radix);
const input = 0;
const expected = 1;
const testData = [
  ['1134806PJFB000010013CD18', 'D'],
  ['1144701CEAA0000000004218', 'S'],
  ['1144701AU1087AE065175318', 'P'],
  ['111252331000000008229719', 'H']
];

testData.forEach(item => {
  test('', () => {
    expect(calculateLuhnMod36(item[input]))
      .toBe(item[expected]);
  });
});


//test based on algorithm description in https://en.wikipedia.org/wiki/Luhn_algorithm
test('', () => {
  expect(calculateLuhnModN(Number.parseInt, codePoint => codePoint.toString(), 10, '7992739871'))
    .toBe('3');
});

//test based on algorithm example in https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm
const map = 'abcdef';
test('', () => {
  expect(calculateLuhnModN(character => map.indexOf(character), codePoint => map[codePoint], map.length, 'abcdef'))
    .toBe('e');
});
