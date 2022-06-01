import { PathSection, Point } from '../_interfaces';

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

export const getRouteSections = (distance: PathSection[]) => {
  const sections: { type: string; duration: number; numTiles: number }[] = [];
  let currentType = '';
  let currentDuration = 0;
  let currentNumTiles = 0;
  distance.forEach((el, index) => {
    if (currentType === el.type) {
      currentDuration += el.weight;
      currentNumTiles++;
    } else {
      if (index !== 0)
        sections.push({
          type: currentType,
          duration: currentDuration,
          numTiles: currentNumTiles,
        });
      currentNumTiles = el.distance;
      currentType = el.type;
      currentDuration = el.weight;
    }
  });

  return sections;
};
