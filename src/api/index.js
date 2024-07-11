import { Cookies } from 'react-cookie';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const jsonAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const formAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const handleAddInterceptors = (instance) => {
  // interceptors request
  instance.interceptors.request.use(
    (config) => {
      const cookie = new Cookies();
      const type = cookie.get('type');
      const accessToken = cookie.get('accessToken');
      if (accessToken && type) {
        config.headers.Authorization = `${type} ${accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err),
  );
  // interceptors response
  instance.interceptors.response.use(
    (resp) => resp,
    (err) => Promise.reject(err),
  );
};

handleAddInterceptors(jsonAxios);
handleAddInterceptors(formAxios);
