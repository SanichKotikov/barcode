import { EAN13_STRUCTURE, SIDE_BIN, MIDDLE_BIN } from './constants';
import { IOptions, IEncoding, ISideEncoding } from './types';
import encodeEAN from './encoder';

interface IEAN13Options extends IOptions {
	flat?: boolean;
	quietZone?: boolean;
}

function checksum(number: string) {
	const res = number
		.substr(0, 12)
		.split('')
		.map(n => +n)
		.reduce((sum, a, idx) => (idx % 2 ? sum + a * 3 : sum + a), 0);
	return (10 - (res % 10)) % 10;
}

function leftSide(data: string) {
	return data.substr(1, 6);
}

function rightSide(data: string) {
	return data.substr(7, 6);
}

function getEncodings(data: string): ISideEncoding {
	const leftData = leftSide(data);
	const leftStructure = EAN13_STRUCTURE[data[0]];
	const rightData = rightSide(data);
	return {
		left: encodeEAN(leftData, leftStructure),
		right: encodeEAN(rightData, 'RRRRRR'),
	};
}

function encode(data: string, options?: IEAN13Options) {
	const encodings = getEncodings(data);

	return options?.flat
		? encodeFlat(data, encodings)
		: encodeGuarded(data, encodings, options);
}

function valid(data: string) {
	return data.search(/^[0-9]{13}$/) !== -1 && +data[12] === checksum(data);
}

function encodeGuarded(
	data: string,
	encodings: ISideEncoding,
	options?: IEAN13Options,
): IEncoding[] {
	const encoded: IEncoding[] = [
		{ data: SIDE_BIN },
		{ data: encodings.left, text: leftSide(data) },
		{ data: MIDDLE_BIN },
		{ data: encodings.right, text: rightSide(data) },
		{ data: SIDE_BIN }
	];

	if (options?.readable ?? true) {
		encoded.unshift({ data: '00000000', text: data[0] });
		if (options?.quietZone) encoded.push({ data: '00000000', text: '>' });
	}

	return encoded;
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
