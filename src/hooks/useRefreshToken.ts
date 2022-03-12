import { useAuth } from '.';
import axios from '../api/axios';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('auth/refresh', {
      withCredentials: true,
    });
    setAuth({
      accessToken: response.data.accessToken,
      role: response.data.role,
    });
    return response.data.accessToken;
  };

  return refresh;
};
