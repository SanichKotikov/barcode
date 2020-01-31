import { ean13, ean8, ean5, ean2 } from '../../packages/ean/src';
import { IEncoding } from '../../packages/svg/src/types';
import renderSvg from '../../packages/svg/src';

interface IModule {
  valid: (input: string) => boolean;
  encode: (input: string, options?: any) => ReadonlyArray<IEncoding>;
}

const REDUCE = 0.28651;

const EAN13 = '9234567890120';
const EAN8 = '12345670';

function render(
  id: string,
  input: string,
  module: IModule,
  options?: any,
) {
  const svg = document.getElementById(id);
  if (!svg || !module.valid(input)) return;
  const encodings = module.encode(input, options);
  renderSvg(svg, encodings, { reduce: REDUCE });
}

render('ean-13', EAN13, ean13, { quietZone: true });
render('ean-13-flat', EAN13, ean13, { flat: true });

render('ean-8', EAN8, ean8);
render('ean-8-flat', EAN8, ean8, { flat: true });

render('ean-5', EAN8.substr(0, 5), ean5);
render('ean-2', EAN8.substr(0, 2), ean2);
