import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/User/userSlice';

export const useAuth = () => {
  return useAppSelector(selectCurrentUser);
};
