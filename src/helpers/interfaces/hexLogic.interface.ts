export interface IOrientation {
  f0: number;
  f1: number;
  f2: number;
  f3: number;
  b0: number;
  b1: number;
  b2: number;
  b3: number;
  startAngle: number;
}

export interface IHex {
  x: number;
  y: number;
  z: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ILayout {
  orientation: IOrientation;
  size: IPoint;
  origin: IPoint;
}
