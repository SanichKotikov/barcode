import { SVG_NS, WIDTH, HEIGHT, FONT, TEXT_SIZE } from './constants';
import { IBarItem, ISvgRenderOptions } from './types';

export function isEmptyData(data: string) {
  return new RegExp('^0+$').test(data);
}

export function convert(data: string): ReadonlyArray<IBarItem> {
  let size = 0;
  const result: IBarItem[] = [];
  const lastIndex = data.length - 1;

  for (let i = 0; i < data.length; i++) {
    if (data[i] === '1') {
      size++;
      if (i !== lastIndex) continue;
    }

    if (size > 0) {
      const idx = i - ((i === lastIndex && data[i] === '1') ? size - 1 : size);
      result.push({ idx, size });
      size = 0;
    }
  }

  return result;
}

export function group(x: number, y: number, options?: Readonly<ISvgRenderOptions>) {
  const el = document.createElementNS(SVG_NS, 'g');
  el.setAttribute('transform', `translate(${x}, ${y})`);
  if (options?.fill) el.setAttribute('fill', options.fill);
  return el;
}

export function text(x: number, y: number, text: string) {
  const el = document.createElementNS(SVG_NS, 'text');
  el.setAttribute('x', x.toString());
  el.setAttribute('y', (y - 2).toString());
  el.setAttribute('text-anchor', 'middle');
  el.setAttribute('style', `font: ${TEXT_SIZE}px ${FONT}`);
  el.append(document.createTextNode(text));
  return el;
}

export function barToPath(guarded: boolean, reduce?: number) {
  const reduction = WIDTH * (reduce ?? 0);
  const height = guarded ? HEIGHT + (TEXT_SIZE / 2) : HEIGHT;

  return ({ idx, size }: IBarItem) => {
    const X = idx * WIDTH;
    return `M${X} 0h${(size * WIDTH) - reduction}v${height}H${X}z`;
  }
}
