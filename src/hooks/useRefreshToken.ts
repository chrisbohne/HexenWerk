import { useAuth } from '.';
import { axiosPublic } from '../api';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPublic.get('auth/refresh', {
      withCredentials: true,
    });
    setAuth({
      accessToken: response.data.accessToken,
      role: response.data.role,
      username: response.data.username,
      email: response.data.email,
      password: response.data.password,
    });
    return response.data.accessToken;
  };

  return refresh;
};
