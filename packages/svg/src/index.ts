import { SVG_NS, WIDTH, HEIGHT, MARGIN_X, MARGIN_Y, TEXT_SIZE } from './constants';
import { isEmptyData, convert, group, text, barToPath } from './helpers';
import { IEncoding, ISvgRenderOptions } from './types';

function render(
  svg: HTMLElement,
  encodings: ReadonlyArray<IEncoding>,
  options?: Readonly<ISvgRenderOptions>,
) {
  const readable = options?.readable ?? true;
  const emptyStart = isEmptyData(encodings[0].data);

  const width = encodings.reduce((sum, val, idx, self) => {
    return (
      sum + ((idx === 0 || idx === self.length - 1) &&
      isEmptyData(val.data) ? 0 : val.data.length)
    );
  }, 0) * WIDTH;

  const height = HEIGHT + (readable ? TEXT_SIZE : 0);

  svg.setAttribute('width', (width + (MARGIN_X * 2)) + 'px');
  svg.setAttribute('height', (height + (MARGIN_Y * 2)) + 'px');

  let gX = emptyStart ? 0 : MARGIN_X;

  for (let i = 0; i < encodings.length; i++) {
    const encoding = encodings[i];
    const toDPath = barToPath(readable && !encoding.text, options?.reduce);
    const eWidth = encoding.data.length * WIDTH;

    const g = group(gX, MARGIN_Y, options);
    const el = document.createElementNS(SVG_NS, 'path');
    el.setAttribute('d', convert(encoding.data).map(toDPath).join(''));
    g.append(el);

    if (readable) {
      if (encoding.text) g.append(text(eWidth / 2, height, encoding.text));
    }

    svg.append(g);
    gX += eWidth;
  }
}

export default render;
