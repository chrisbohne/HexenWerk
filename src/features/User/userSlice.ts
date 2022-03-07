import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../api';

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
  async (data: any) => {
    const response = await authService.register(data);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const userSelector = (state: any) => state.user;

export default userSlice.reducer;
