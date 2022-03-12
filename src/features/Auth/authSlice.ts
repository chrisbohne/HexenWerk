import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  username: string;
  email: string;
  password: string;
  role: string;
  accessToken: string;
}

const initialState: AuthState = {
  username: '',
  email: '',
  password: '',
  role: '',
  accessToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, email, password, role, accessToken },
      }: PayloadAction<AuthState>
    ) => {
      state.username = username;
      state.email = email;
      state.password = password;
      state.role = role;
      state.accessToken = accessToken;
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
