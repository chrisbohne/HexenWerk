import axios from 'axios';
import { ILogin, IRegistration } from '../features/User/interfaces';

export const authService = {
  register,
  login,
  logout,
};

const baseUrl = 'http://localhost:3000/auth';

async function register(user: IRegistration) {
  try {
    const response = await axios.post(baseUrl + '/register', user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function login(user: ILogin) {
  try {
    const response = await axios.post(baseUrl + '/login', user, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function logout() {
  try {
    const response = await axios.post(
      baseUrl + '/logout',
      {},
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
