import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GridPosition,
  mapData,
  mapMode,
  MapState,
  Point,
  Route,
} from './_interfaces';
import { getHexHash } from './_utils/drawGridHelpers';

export const reset = createAction('reset');

const initialState: MapState = {
  scale: 0.8,
  viewPortTopLeft: { x: 0, y: 0 },
  selectedTile: '0',
  selectedCategory: '',
  map: {},
  mapName: '',
  mapSaved: true,
  mapSize: 0,
  mode: 'none',
  startingPoint: undefined,
  destination: undefined,
  weights: {
    street: 5,
    rail: 5,
    flight: 8,
    shipping: 7,
  },
  route: undefined,
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
    changeMode: (state, { payload: newMode }: PayloadAction<mapMode>) => {
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
    changeMap: (state, { payload: map }: PayloadAction<mapData>) => {
      state.map = map;
    },
    changeMapName: (state, { payload: newMapName }: PayloadAction<string>) => {
      state.mapName = newMapName;
    },
    changeMapSaved: (state, { payload: mapSaved }: PayloadAction<boolean>) => {
      state.mapSaved = mapSaved;
    },
    changeMapSize: (state, { payload: newMapSize }: PayloadAction<number>) => {
      state.mapSize = newMapSize;
    },
    changeRoute: (
      state,
      { payload: newRoute }: PayloadAction<Route | undefined>
    ) => {
      state.route = newRoute;
    },
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reset, () => {
      return initialState;
    });
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
  changeMap,
  changeMapName,
  changeMapSaved,
  changeRoute,
  changeMapSize,
} = mapSlice.actions;

export default mapSlice.reducer;
