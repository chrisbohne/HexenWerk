import { Point } from '../interfaces';

export const ORIGIN = Object.freeze({ x: 0, y: 0 });

export const diffPoints = (p1: Point, p2: Point) => {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
};

export const addPoints = (p1: Point, p2: Point) => {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};

export const scalePoint = (p1: Point, scale: number) => {
  return { x: p1.x / scale, y: p1.y / scale };
};
