import { Point } from '.';

export interface MapState {
  scale: number;
  viewPortTopLeft: Point;
  activeSelector: 'cursor' | 'eraser' | 'hand';
  selectedTile: string;
  selectedCategory: string;
  mapSize: number;
  map: {
    [key: string]: string;
  };
  streetWeight: number;
  railWeight: number;
  flightWeight: number;
}

export interface GridPosition {
  row: number;
  col: number;
}
