import { axiosPrivate } from '.';
import { Map } from '../features/Auth/_interfaces';
import { IUser } from '../features/Users/interfaces';

export const userService = {
  getUsers,
  getCurrentUser,
  saveUserMap,
  updateUserMap,
  deleteUserMap,
};

export const controller = new AbortController();

async function getUsers(): Promise<IUser[]> {
  const response = await axiosPrivate.get('users/get', {
    signal: controller.signal,
  });
  return response.data;
}

async function getCurrentUser() {
  const response = await axiosPrivate.get('users/me');
  return response.data;
}

// as logged in user

async function saveUserMap(map: { name: string; mapData: string }) {
  const response = await axiosPrivate.post('maps/me', map, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return response.data;
}

async function updateUserMap(map: Map) {
  const response = await axiosPrivate.patch(`maps/me/${map.id}`, map, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return response.data;
}

async function deleteUserMap(id: number) {
  const response = await axiosPrivate.delete(`maps/me/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return response.data;
}
