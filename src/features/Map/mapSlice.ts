import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Point } from './utils';

interface MapState {
  scale: number;
  viewPortTopLeft: Point;
  // mapData: number[][];
  selectedTile: number;
  mapSize: number;
  map: {
    [key: string]: number;
  };
}

interface GridPosition {
  row: number;
  col: number;
}

const initialState: MapState = {
  scale: 1,
  viewPortTopLeft: { x: 0, y: 0 },
  // mapData: [
  //   [1, 1, 1, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 0, 0],
  //   [0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0],
  // ],
  selectedTile: 1,
  map: {
    '00': 1,
    '01': 1,
    '02': 1,
    '11': 1,
    '21': 1,
    '22': 1,
    '31': 1,
    '32': 1,
  },
  mapSize: 0,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updateScale: (state, { payload: zoom }: PayloadAction<number>) => {
      state.scale = state.scale * zoom;
    },
    updateViewPortTopLeft: (
      state,
      { payload: viewPortTopLeft }: PayloadAction<Point>
    ) => {
      state.viewPortTopLeft = {
        x: state.viewPortTopLeft.x - viewPortTopLeft.x,
        y: state.viewPortTopLeft.y - viewPortTopLeft.y,
      };
    },
    addTile: (
      state,
      { payload: gridPosition }: PayloadAction<GridPosition>
    ) => {
      const id = hash(gridPosition);
      if (!Object.prototype.hasOwnProperty.call(state.map, id)) {
        state.map[id] = state.selectedTile;
        state.mapSize++;
      } else {
        state.map[id] = state.selectedTile;
      }
    },
    removeTile: (
      state,
      { payload: gridPosition }: PayloadAction<GridPosition>
    ) => {
      const id = hash(gridPosition);
      if (Object.prototype.hasOwnProperty.call(state.map, id)) {
        delete state.map[id];
        state.map.size--;
      }
    },
  },
});

function hash(gridPosition: GridPosition) {
  return '' + gridPosition.row + gridPosition.col;
}

export const { updateScale, updateViewPortTopLeft, addTile, removeTile } =
  mapSlice.actions;

export default mapSlice.reducer;
