import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridPosition, MapState, Point } from './interfaces';

const initialState: MapState = {
  scale: 1,
  viewPortTopLeft: { x: 0, y: 0 },
  selectedTile: '0',
  selectedCategory: '',
  map: {
    '0,0': '1',
    '0,1': '1',
    '0,2': '1',
    '1,1': '1',
    '2,1': '1',
    '2,2': '1',
    '3,1': '1',
    '3,2': '1',
    '0,3': '1',
    '0,4': '1',
    '0,5': '1',
    '0,6': '1',
    '0,7': '1',
    '0,8': '1',
    '0,9': '1',
    '0,10': '1',
  },
  mapSize: 0,
  activeSelector: 'cursor',
  streetWeight: 1,
  railWeight: 1,
  flightWeight: 1,
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
        state.mapSize--;
      }
    },
    changeSelector: (
      state,
      { payload: newFunction }: PayloadAction<'eraser' | 'hand' | 'cursor'>
    ) => {
      state.activeSelector = newFunction;
    },
    changeSelectedTile: (
      state,
      { payload: newTile }: PayloadAction<string>
    ) => {
      state.selectedTile = newTile;
    },
    changeSelectedCategory: (
      state,
      { payload: newCategory }: PayloadAction<string>
    ) => {
      state.selectedCategory = newCategory;
    },
  },
});

function hash(gridPosition: GridPosition) {
  return '' + gridPosition.row + ',' + gridPosition.col;
}

export const {
  updateScale,
  updateViewPortTopLeft,
  addTile,
  removeTile,
  changeSelector,
  changeSelectedTile,
  changeSelectedCategory,
} = mapSlice.actions;

export default mapSlice.reducer;
