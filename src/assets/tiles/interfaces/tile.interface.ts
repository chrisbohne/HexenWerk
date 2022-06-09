export interface ITile {
  svg: string;
  height: number;
  category: string;
  streetConnections: number[] | undefined;
  railConnections: number[] | undefined;
  airport: boolean;
  shipping: boolean;
}

export interface ITileCategory {
  [key: number]: ITile;
}
