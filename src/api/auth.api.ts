import axios from 'axios';

export const authService = {
  register,
  login,
  logout,
};

const baseUrl = 'http://localhost:3000/auth';

interface Signup {
  name: string;
  email: string;
  password: string;
}

interface Login {
  email: string;
  password: string;
}

async function register(dto: Signup) {
  try {
    const response = await axios.post(baseUrl + '/register', dto);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function login(dto: Login) {
  try {
    const response = await axios.post(baseUrl + '/login', dto, {
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
