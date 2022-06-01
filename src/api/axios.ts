import axios from 'axios';
import { store } from '../app/store';
import { updateAccessToken } from '../features/Auth';

const BASE_URL = 'http://localhost:3000';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    if (config.headers && !config.headers['Authorization']) {
      const accessToken = store.getState().auth.accessToken;
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error?.response.status === 401 && !prevRequest.sent) {
      prevRequest.sent = true;
      const response = await axiosPublic.get('auth/refresh', {
        withCredentials: true,
      });
      store.dispatch(updateAccessToken(response.data.accessToken));
      prevRequest.headers[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
