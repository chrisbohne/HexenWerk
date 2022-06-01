import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Map } from './_interfaces';

export interface AuthState {
  username: string;
  email: string;
  role: string;
  accessToken: string;
  maps: Map[];
}

const initialState: AuthState = {
  username: '',
  email: '',
  role: '',
  accessToken: '',
  maps: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, email, role, accessToken },
      }: PayloadAction<AuthState>
    ) => {
      state.username = username;
      state.email = email;
      state.role = role;
      state.accessToken = accessToken;
    },
    removeCredentials: (state) => {
      state.username = '';
      state.email = '';
      state.role = '';
      state.accessToken = '';
    },
    updateAccessToken: (
      state,
      { payload: newAccessToken }: PayloadAction<string>
    ) => {
      state.accessToken = newAccessToken;
    },
    setMaps: (state, { payload: maps }: PayloadAction<Map[]>) => {
      state.maps = maps;
    },
    removeMap: (state, { payload: map }: PayloadAction<Map>) => {
      const index = state.maps.findIndex((el) => el.name === map.name);
      state.maps.splice(index, 1);
    },
    addMap: (state, { payload: map }: PayloadAction<Map>) => {
      const index = state.maps.findIndex((el) => el.id === map.id);
      if (index === -1) state.maps.push(map);
      else state.maps[index] = map;
    },
  },
});

export const {
  setCredentials,
  removeCredentials,
  updateAccessToken,
  setMaps,
  addMap,
  removeMap,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
