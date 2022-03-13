import { useAuth, useAxiosPrivate } from '.';

export const useLogout = () => {
  const { removeAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    localStorage.setItem('persist', JSON.stringify(false));
    removeAuth();
    try {
      await axiosPrivate.get('/auth/logout');
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};
