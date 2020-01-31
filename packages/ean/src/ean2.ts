import { EAN2_STRUCTURE } from './constants';
import { IEncoding } from './types';
import encodeEAN from './encoder';

function valid(data: string) {
  return data.search(/^[0-9]{2}$/) !== -1;
}

function encode(data: string): IEncoding[] {
  if (!valid(data)) throw new RangeError();
  const structure = EAN2_STRUCTURE[parseInt(data) % 4];
  return [{
    data: '1011' + encodeEAN(data, structure, '01'),
    text: data,
  }];
}

export default {
  encode,
  valid,
};
