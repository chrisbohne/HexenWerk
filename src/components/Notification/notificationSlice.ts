import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

interface INotification {
  id: string;
  type: string;
  message: string;
}

interface INote {
  // type: 'Success' | 'Error' | 'Info';
  type: string;
  message: string;
}

const initialState: INotification[] = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, { payload: note }: PayloadAction<INote>) => {
      const notification = {
        id: v4(),
        type: note.type,
        message: note.message,
      };
      state.push(notification);
    },
    removeNotification: (
      state,
      { payload: notificationId }: PayloadAction<string>
    ) => {
      const index = state.findIndex((el) => el.id === notificationId);
      state.splice(index, 1);
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
