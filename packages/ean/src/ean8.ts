import { SIDE_BIN, MIDDLE_BIN } from './constants';
import { IOptions, IEncoding, ISideEncoding } from './types';
import encodeEAN from './encoder';

interface IEAN8Options extends IOptions {
  flat?: boolean;
}

function checksum(number: string) {
  const res = number
    .substr(0, 7)
    .split('')
    .map(n => +n)
    .reduce((sum, a, idx) => (idx % 2 ? sum + a : sum + a * 3), 0);
  return (10 - (res % 10)) % 10;
}

function leftSide(data: string) {
  return data.substr(0, 4);
}

function rightSide(data: string) {
  return data.substr(4, 4);
}

function getEncodings(data: string): ISideEncoding {
  const leftData = leftSide(data);
  const rightData = rightSide(data);
  return {
    left: encodeEAN(leftData, 'LLLL'),
    right: encodeEAN(rightData, 'RRRR'),
  }
}

function valid(data: string) {
  return data.search(/^[0-9]{8}$/) !== -1 && +data[7] === checksum(data);
}

function encode(data: string, options?: IEAN8Options) {
  if (/^[0-9]{7}$/.test(data)) data += checksum(data);
  if (!valid(data)) throw new RangeError();
  const encodings = getEncodings(data);

  return options?.flat
    ? encodeFlat(data, encodings)
    : encodeGuarded(data, encodings);
}

function encodeGuarded(data: string, encodings: ISideEncoding): IEncoding[] {
  return [
    { data: SIDE_BIN },
    { data: encodings.left, text: leftSide(data) },
    { data: MIDDLE_BIN },
    { data: encodings.right, text: rightSide(data) },
    { data: SIDE_BIN }
  ];
}

function encodeFlat(data: string, encodings: ISideEncoding): IEncoding[] {
  return [{
    data: [SIDE_BIN, encodings.left, MIDDLE_BIN, encodings.right, SIDE_BIN].join(''),
    text: data,
  }];
}

export default {
  encode,
  valid,
};
