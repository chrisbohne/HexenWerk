import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../../features/Auth';
import { usersReducer } from '../../features/Users';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
