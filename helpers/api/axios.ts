import axios, { AxiosError, CreateAxiosDefaults } from 'axios';
import Cookies from 'js-cookie';

const config: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_PROXY,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
};

export const axiosInstanse = axios.create(config);

axiosInstanse.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError): Promise<AxiosError> => {
    if (error.code === '401') {
      Cookies.remove('token');
    }

    return Promise.reject(error);
  },
);
