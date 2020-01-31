import { EAN5_STRUCTURE } from './constants';
import { IEncoding } from './types';
import encodeEAN from './encoder';

function checksum(data: string) {
  const result = data
    .split('')
    .map(n => +n)
    .reduce((sum, a, idx) => {
      return idx % 2 ? sum + a * 9 : sum + a * 3;
    }, 0);
  return result % 10;
}

function valid(data: string) {
  return data.search(/^[0-9]{5}$/) !== -1;
}

function encode(data: string): IEncoding[] {
  if (!valid(data)) throw new RangeError();
  const structure = EAN5_STRUCTURE[checksum(data)];
  return [{
    data: '1011' + encodeEAN(data, structure, '01'),
    text: data,
  }];
}

export default {
  encode,
  valid,
};
