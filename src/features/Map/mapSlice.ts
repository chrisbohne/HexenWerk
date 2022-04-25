import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridPosition, MapState, Point } from './interfaces';

const initialState: MapState = {
  scale: 1,
  viewPortTopLeft: { x: 0, y: 0 },
  selectedTile: '0',
  selectedCategory: '',
  map: {},
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
