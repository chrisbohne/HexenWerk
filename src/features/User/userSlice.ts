import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  username: string;
  email: string;
  password: string;
  role: string;
  accessToken: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  password: '',
  role: '',
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { username, email, password, role, accessToken },
      }: PayloadAction<UserState>
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

export const { setCredentials, removeCredentials } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;
