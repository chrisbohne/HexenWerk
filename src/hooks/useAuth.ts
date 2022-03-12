import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectCurrentUser,
  setCredentials,
  removeCredentials,
  UserState,
} from '../features/User/userSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectCurrentUser);
  const setAuth = (data: Partial<UserState>) => {
    dispatch(setCredentials({ ...auth, ...data }));
  };
  const removeAuth = () => {
    dispatch(removeCredentials());
  };

  return { auth, setAuth, removeAuth };
};
