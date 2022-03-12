import axios from './axios';
import { ILogin, IRegistration } from '../features/Auth/interfaces';

export const authService = {
  register,
  usernameTaken,
  login,
  logout,
};

async function register(
  user: IRegistration
): Promise<{ username: string; email: string; id: number }> {
  const response = await axios.post('/auth/register', user, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
}

async function usernameTaken(username: string) {
  const response = await axios.get(`users/taken/${username}`);
  return response.data;
}

async function login(user: ILogin): Promise<{
  username: string;
  email: string;
  id: number;
  accessToken: string;
  role: string;
}> {
  const response = await axios.post('/auth/login', user, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
}

async function logout() {
  const response = await axios('/auth/logout', {
    withCredentials: true,
  });
  return response.data;
}
