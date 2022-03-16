import { useAuth } from '.';
import { authService } from '../api';

export const useLogout = () => {
  const { removeAuth } = useAuth();

  const logout = async () => {
    localStorage.setItem('persist', JSON.stringify(false));
    try {
      await authService.logout();
      removeAuth();
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};
