import ean5 from './ean5';

test('should be able to encode', () => {
  expect(ean5.valid('54495')).toBeTruthy();
  expect(ean5.encode('54495')).toEqual([{
    text: '54495',
    data: '10110110001010100011010011101010001011010111001',
  }]);
  expect(ean5.encode('12345')).toEqual([{
    text: '12345',
    data: '10110110011010010011010100001010100011010110001',
  }]);
});

test('should error with invalid input', () => {
  expect(ean5.valid('1234')).toBeFalsy();
  expect(() => { ean5.encode('1234'); }).toThrow(RangeError);
});
