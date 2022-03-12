import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  username: string;
  email: string;
  password: string;
  role: string;
  accessToken: string;
  persist: boolean;
}

const persist = JSON.parse(localStorage.getItem('persist') || 'false');

const initialState: AuthState = {
  username: '',
  email: '',
  password: '',
  role: '',
  accessToken: '',
  persist: persist,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, email, password, role, accessToken, persist },
      }: PayloadAction<AuthState>
    ) => {
      state.username = username;
      state.email = email;
      state.password = password;
      state.role = role;
      state.accessToken = accessToken;
      state.persist = persist;
    },
    removeCredentials: (state) => {
      state.username = '';
      state.email = '';
      state.password = '';
      state.role = '';
      state.accessToken = '';
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
