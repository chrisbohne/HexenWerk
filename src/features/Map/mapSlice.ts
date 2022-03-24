import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Point } from './utils';

interface MapState {
  scale: number;
  viewPortTopLeft: Point;
  mapData: string;
}

const initialState: MapState = {
  scale: 1,
  viewPortTopLeft: { x: 0, y: 0 },
  mapData: 'map',
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
  },
});

export const { updateScale, updateViewPortTopLeft } = mapSlice.actions;

export default mapSlice.reducer;
