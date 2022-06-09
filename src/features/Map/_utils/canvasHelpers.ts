import { RefObject, WheelEvent } from 'react';
import { INTERVAL, MAX_SCALE, MIN_SCALE } from '../_constants/canvas';
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


export const getMouseOffset = (e: WheelEvent, scale: number, mousePosRef: RefObject<{x: number, y: number}>) => {
  const direction = e.deltaY > 0 ? 'out' : 'in';
  let newScale: number;
  if (direction === 'in' && scale + INTERVAL < MAX_SCALE) {
    newScale = +(scale + INTERVAL).toFixed(1);
  } else if (direction === 'in') {
    newScale = MAX_SCALE;
  } else if (direction === 'out' && scale - INTERVAL > MIN_SCALE) {
    newScale = +(scale - INTERVAL).toFixed(1);
  } else if (direction === 'out') {
    newScale = MIN_SCALE;
  } else {
    newScale = scale;
  }

  if(!mousePosRef.current) return {mouseOffset: {x: 0, y: 0}, newScale: scale}

  const lastMousePos = {
    x: mousePosRef.current.x / scale,
    y: mousePosRef.current.y / scale,
  };

  const newMousePos = {
    x: mousePosRef.current.x / newScale,
    y: mousePosRef.current.y / newScale,
  };

  return {mouseOffset :diffPoints(lastMousePos, newMousePos), newScale};

}