import {
  flatLayout,
  Layout,
  pixelToHex,
  Point,
  hexCorners,
  hexRound,
} from './hexLogic';

const centerPoint = Point(0, 0);

// const flat = Layout(flatLayout, Point(200, 100), centerPoint);
const flat = Layout(flatLayout, Point(100, 50), centerPoint);

export const getCorners = (point: { x: number; y: number }) =>
  hexCorners(flat, pixelToHex(flat, point));

export const getHex = (point: { x: number; y: number }) =>
  hexRound(pixelToHex(flat, point));
