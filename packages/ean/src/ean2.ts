import { EAN2_STRUCTURE } from './constants';
import { IEncoding } from './types';
import encodeEAN from './encoder';

function encode(data: string): IEncoding[] {
  const structure = EAN2_STRUCTURE[parseInt(data) % 4];
  return [{
    data: '1011' + encodeEAN(data, structure, '01'),
    text: data,
  }];
}

function valid(data: string) {
  return data.search(/^[0-9]{2}$/) !== -1;
}

export default {
  encode,
  valid,
};
