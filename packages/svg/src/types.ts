export interface IBarItem {
  idx: number;
  size: number;
}

export interface IEncoding {
  text?: string;
  data: string;
}

export interface ISvgRenderOptions {
  fill?: string;
  reduce?: number;
  readable?: boolean;
}
