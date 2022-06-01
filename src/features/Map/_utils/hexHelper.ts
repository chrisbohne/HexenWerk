import { ICubeHex, IOffsetHex } from '../_interfaces';
import {
  flatLayout,
  Layout,
  pixelToHex,
  Point,
  hexCorners,
  hexRound,
  hexToPixel,
  hexCubeNeighbor,
  offsetToCube,
  offsetFromCube,
} from './hexLogic';

const centerPoint = Point(0, 0);

const flat = Layout(flatLayout, Point(100, 50), centerPoint);

export const getHex = (point: { x: number; y: number }) =>
  hexRound(pixelToHex(flat, point));

export const getPixel = (hex: ICubeHex) => hexToPixel(flat, hex);

export const getCorners = (point: { x: number; y: number }) =>
  hexCorners(flat, getHex(point));

export const getNeighbors = (hex: IOffsetHex) => {
  const cubeHex = offsetToCube(hex);
  const neighbors = [];
  for (let i = 0; i < 6; i++) {
    const neighbor = hexCubeNeighbor(cubeHex, i);
    const offsetHex = offsetFromCube(neighbor);
    neighbors.push(offsetHex);
  }
  return neighbors;
};
