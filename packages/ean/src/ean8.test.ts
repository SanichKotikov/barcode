import ean8 from './ean8';

const INPUT = '12345670';
const DATA = '1010011001001001101111010100011010101001110101000010001001110010101';

const ENCODINGS = [
  { data: '101' },
  { data: '0011001001001101111010100011', text: '1234' },
  { data: '01010' },
  { data: '1001110101000010001001110010', text: '5670' },
  { data: '101' },
];

test('should be able to encode', () => {
  expect(ean8.valid(INPUT)).toBeTruthy();
  expect(ean8.encode(INPUT)).toEqual(ENCODINGS);
});

test('should be able to encode without checksum', () => {
  expect(ean8.encode(INPUT.substr(0, 7))).toEqual(ENCODINGS);
});

test('should be able to encode with flat option', () => {
  expect(ean8.encode(INPUT, { flat: true }))
    .toEqual([{ text: INPUT, data: DATA }]);
});

test('should error with invalid input', () => {
  expect(ean8.valid('12345')).toBeFalsy();
  expect(() => { ean8.encode('12345'); }).toThrow(RangeError);
});
