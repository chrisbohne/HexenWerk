import { Point } from '.';

export interface mapData {
  [key: string]: string;
}

export interface MapState {
  scale: number;
  viewPortTopLeft: Point;
  mode: mapMode;
  selectedTile: string;
  selectedCategory: string;
  mapSize: number;
  map: mapData;
  startingPoint: GridPosition | undefined;
  destination: GridPosition | undefined;
  weights: Weights;
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface Weights {
  street: number;
  rail: number;
  flight: number;
  shipping: number;
}

export type mapMode =
  | 'none'
  | 'eraser'
  | 'append'
  | 'destinationSelection'
  | 'startingPointSelection';
