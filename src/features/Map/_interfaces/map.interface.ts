import { Point } from '.';

export interface mapData {
  [key: string]: string;
}

export interface PathSection {
  tile: string;
  type: string;
  weight: number;
  distance: number;
}

export interface Route {
  duration: number;
  distance: number;
  path: PathSection[];
}

export interface MapState {
  scale: number;
  viewPortTopLeft: Point;
  mode: mapMode;
  selectedTile: string;
  selectedCategory: string;
  mapSize: number;
  map: mapData;
  mapName: string;
  mapSaved: boolean;
  startingPoint: GridPosition | undefined;
  destination: GridPosition | undefined;
  weights: Weights;
  route: Route | undefined;
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
  | 'startingPointSelection'
  | 'direction';
