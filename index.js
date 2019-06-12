'use strict';

/* 
    Code based on https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm
    with minimal modifications.
*/

/**
 * @module calculateLuhnModN
 */

/**
 * A value to be mapped to and from a code point.
 * @typedef {any} Value
 */

/**
 * Maps a value to a code point.
 * @callback valueToCodePoint
 * @param {!Value} value - a value (typically a character) to be mapped to a number.
 * @returns {number}
 */

/**
 * Maps a code point to a value.
 * @callback codePointToValue
 * @param {!number} codePoint - numeric value of the code point.
 * @returns {Value}
 */

/**
 * Calculates Luhn Mod N control values
 * @param {!valueToCodePoint} codePointFromCharacter - Function that maps a value (typically a character) to a code point.
 * @param {!codePointToValue} characterFromCodePoint - Function that maps a code point to a value (typically a character).
 * @param {!number} n - modulo.
 * @param {!Value[]} input - String of values (typically characters) for which the control value will be calculated.
 * @returns {Value} - The control value.
 */

module.exports = function calculateLuhnModN(codePointFromCharacter, characterFromCodePoint, n, input) {
  var factor = 2;
  var sum = 0;

  // Starting from the right and working leftwards is easier since 
  // the initial "factor" will always be "2" 
  for (var i = input.length - 1; i >= 0; i--) {
    var codePoint = codePointFromCharacter(input[i]);
    var addend = factor * codePoint;

    // Alternate the "factor" that each "codePoint" is multiplied by
    factor = (factor == 2) ? 1 : 2;

    // Sum the digits of the "addend" as expressed in base "n"
    addend = Math.floor(addend / n) + (addend % n);
    sum += addend;
  }

  // Calculate the number that must be added to the "sum" 
  // to make it divisible by "n"
  var remainder = sum % n;
  var checkCodePoint = (n - remainder) % n;

  return characterFromCodePoint(checkCodePoint);
}
