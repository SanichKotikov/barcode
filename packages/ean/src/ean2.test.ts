import ean2 from './ean2';

test('should be able to encode', () => {
  expect(ean2.valid('53')).toBeTruthy();
  expect(ean2.encode('53')).toEqual([{ text: '53', data: '10110110001010100001' }]);
  expect(ean2.encode('12')).toEqual([{ text: '12', data: '10110011001010010011' }]);
});

test('should error with invalid input', () => {
  expect(ean2.valid('1')).toBeFalsy();
  expect(() => { ean2.encode('1'); }).toThrow(RangeError);
});
