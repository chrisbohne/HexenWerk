import { axiosPrivate } from '.';
import { IUser } from '../features/Users/interfaces';

export const userService = {
  getUsers,
  getCurrentUser,
};

export const controller = new AbortController();

async function getUsers(): Promise<IUser[]> {
  const response = await axiosPrivate.get('users/get', {
    signal: controller.signal,
  });
  return response.data;
}

async function getCurrentUser(): Promise<IUser> {
  const response = await axiosPrivate.get('me');
  return response.data;
}

// build get maps from user route in backend

async function getCurrentUserMaps() {
  //
}
