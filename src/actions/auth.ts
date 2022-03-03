import { LOGIN, LOGOUT, REGISTER } from './type';

export const register = (registerDto: any) => ({
  type: REGISTER,
  payload: registerDto,
});

export const login = (loginDto: any) => ({
  type: LOGIN,
  payload: loginDto,
});

export const logout = () => ({
  type: LOGOUT,
});
