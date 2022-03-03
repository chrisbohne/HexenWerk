import { REGISTER, LOGIN, LOGOUT } from '../actions/type';

const initialState = { isLoggedIn: false, user: null };
export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
