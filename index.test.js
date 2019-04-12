const calculateLuhnModN = require('./index');

const data = [
  {
    n: 36,
    input: '1134806PJFB000010013CD18',
    output: 'D'
  },
  //test based on algorithm description in https://en.wikipedia.org/wiki/Luhn_algorithm
  {
    n: 10,
    input: '7992739871',
    output: '3'
  }
];

data.forEach(item => {
  test('', () => { expect(calculateLuhnModN([...item.input].map(c => Number.parseInt(c, item.n)), item.n)).toBe(Number.parseInt(item.output, item.n)) });
});
