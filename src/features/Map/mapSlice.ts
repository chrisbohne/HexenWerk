import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridPosition, MapState, Point } from './interfaces';
import { getHexHash } from './utils/drawGridHelpers';

const initialState: MapState = {
  scale: 1,
  viewPortTopLeft: { x: 0, y: 0 },
  selectedTile: '0',
  selectedCategory: '',
  map: {},
  mapSize: 0,
  mode: 'none',
  startingPoint: undefined,
  destination: undefined,
  weights: {
    street: 1,
    rail: 2,
    flight: 10,
    shipping: 5,
  },
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
      const id = getHexHash(gridPosition);
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
      const id = getHexHash(gridPosition);
      if (Object.prototype.hasOwnProperty.call(state.map, id)) {
        delete state.map[id];
        state.mapSize--;
      }
    },
    changeMode: (
      state,
      {
        payload: newMode,
      }: PayloadAction<
        | 'eraser'
        | 'none'
        | 'append'
        | 'destinationSelection'
        | 'startingPointSelection'
      >
    ) => {
      state.mode = newMode;
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
    changeStartingPoint: (
      state,
      { payload: newPoint }: PayloadAction<GridPosition | undefined>
    ) => {
      state.startingPoint = newPoint;
    },
    changeDestination: (
      state,
      { payload: newPoint }: PayloadAction<GridPosition | undefined>
    ) => {
      state.destination = newPoint;
    },
    changeWeights: (
      state,
      { payload: updatedWeight }: PayloadAction<ChangeWeight>
    ) => {
      state.weights[updatedWeight.type as keyof typeof state.weights] =
        updatedWeight.value;
    },
  },
});

interface ChangeWeight {
  type: string;
  value: number;
}

export const {
  updateScale,
  updateViewPortTopLeft,
  addTile,
  removeTile,
  changeMode,
  changeSelectedTile,
  changeSelectedCategory,
  changeStartingPoint,
  changeDestination,
  changeWeights,
} = mapSlice.actions;

export default mapSlice.reducer;
