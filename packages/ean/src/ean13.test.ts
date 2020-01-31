import ean13 from './ean13';
import { EMPTY_BIN } from './constants';

const INPUT = '5901234123457';
const DATA = '10100010110100111011001100100110111101001110101010110011011011001000010101110010011101000100101';

const ENCODINGS = [
  { data: EMPTY_BIN, text: '5' },
  { data: '101' },
  { data: '000101101001110110011001001101111010011101', text: '901234' },
  { data: '01010' },
  { data: '110011011011001000010101110010011101000100', text: '123457' },
  { data: '101' },
];

test('should be able to encode', () => {
  expect(ean13.valid(INPUT)).toBeTruthy();
  expect(ean13.encode(INPUT)).toEqual(ENCODINGS);
});

test('should be able to encode without checksum', () => {
  expect(ean13.encode(INPUT.substr(0, 12))).toEqual(ENCODINGS);
});

test('should be able to encode with flat option', () => {
  expect(ean13.encode(INPUT, { flat: true }))
    .toEqual([{ text: INPUT, data: DATA }]);
});

test('should be able to encode with quiet zone option', () => {
  expect(ean13.encode(INPUT, { quietZone: true })).toEqual([
    ...ENCODINGS,
    { data: EMPTY_BIN, text: '>' },
  ]);
});

test('should be able to encode with quiet zone and flat option', () => {
  expect(ean13.encode(INPUT, { flat: true, quietZone: true }))
    .toEqual([{ text: INPUT, data: DATA }]);
});

test('should error with invalid input', () => {
  expect(ean13.valid('12345')).toBeFalsy();
  expect(() => { ean13.encode('12345'); }).toThrow(RangeError);
});
