import { BINARIES } from './constants';

function encode(data: string, structure: string, separator?: string) {
	let encoded = data
		.split('')
		.map((val, idx) => BINARIES[structure[idx]])
		.map((val, idx) => (val ? val[data[idx]] : ''));

	if (separator) {
		const last = data.length - 1;
		encoded = encoded.map((val, idx) => (idx < last ? val + separator : val));
	}

	return encoded.join('');
}

export default encode;
