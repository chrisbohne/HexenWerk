import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import {
  selectCurrentUser,
  setCredentials,
  removeCredentials,
  AuthState,
} from '../features/Auth/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectCurrentUser);
  const setAuth = (data: Partial<AuthState>) => {
    dispatch(setCredentials({ ...auth, ...data }));
  };
  const removeAuth = () => {
    dispatch(removeCredentials());
  };

  return { auth, setAuth, removeAuth };
};
