import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../api';
import { ILogin, IRegistration } from './interfaces';

interface IState {
  user: object;
  status: string;
  error: undefined | string;
}

const initialState: IState = {
  user: {},
  status: 'idle',
  error: '',
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: IRegistration) => {
    const response = await authService.register(data);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: ILogin) => {
    const response = await authService.login(data);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action);
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const userSelector = (state: IState) => state.user;

export default userSlice.reducer;
