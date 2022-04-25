import { IHex } from '../interfaces';
import {
  flatLayout,
  Layout,
  pixelToHex,
  Point,
  hexCorners,
  hexRound,
  hexToPixel,
} from './hexLogic';

const centerPoint = Point(0, 0);

// const flat = Layout(flatLayout, Point(200, 100), centerPoint);
const flat = Layout(flatLayout, Point(100, 50), centerPoint);

export const getHex = (point: { x: number; y: number }) =>
  hexRound(pixelToHex(flat, point));

export const getPixel = (hex: IHex) => hexToPixel(flat, hex);

export const getCorners = (point: { x: number; y: number }) =>
  hexCorners(flat, getHex(point));

console.log(getCorners({ x: 0, y: 0 }));
console.log(getCorners({ x: 20, y: 20 }));

console.log(getHex({ x: 0, y: 0 }));
console.log(getHex({ x: 20, y: 20 }));
