import axios from 'axios';

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

const register = async (dto: Signup) => {
  try {
    const response = await axios.post(baseUrl + '/register', dto);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (dto: Login) => {
  try {
    const response = await axios.post(baseUrl + '/login', dto, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
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
};

export default {
  register,
  login,
  logout,
};
