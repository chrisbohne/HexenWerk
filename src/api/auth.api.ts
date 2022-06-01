import { axiosPublic, axiosPrivate } from './';
import { ILogin, IRegistration } from '../features/Auth/_interfaces';

export const authService = {
  register,
  usernameTaken,
  login,
  logout,
};

async function register(
  user: IRegistration
): Promise<{ username: string; email: string; id: number }> {
  const response = await axiosPublic.post('/auth/register', user, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
}

async function usernameTaken(username: string) {
  const response = await axiosPublic.get(`users/taken/${username}`);
  return response.data;
}

async function login(user: ILogin): Promise<{
  username: string;
  email: string;
  id: number;
  accessToken: string;
  role: string;
}> {
  const response = await axiosPublic.post('/auth/login', user, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
}

async function logout() {
  await axiosPrivate.get('/auth/logout');
}
