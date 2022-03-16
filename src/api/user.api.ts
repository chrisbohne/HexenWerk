import { axiosPrivate } from '.';
import { IUser } from '../features/Users/interfaces';

export const userService = {
  getUsers,
};

export const controller = new AbortController();

async function getUsers(): Promise<IUser[]> {
  const response = await axiosPrivate.get('users/get', {
    signal: controller.signal,
  });
  return response.data;
}
