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

export const registerUser = async (dto: Signup) => {
  try {
    const response = await axios.post(baseUrl + '/register', dto);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (dto: Login) => {
  try {
    const response = await axios.post(baseUrl + '/login', dto, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
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
