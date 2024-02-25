import { axiosInstanse } from '@/helpers/api/axios';
import { API } from '@/params';
import type {
  TUserAPI,
  TLoginParams,
  TForgotPasswordAPI,
  TSignupParams,
  TLoginSignupAPI,
  TUserChange,
} from '@/types/api/user';
import Cookies from 'js-cookie';

export function getUser() {
  return axiosInstanse.get<void, TUserAPI>(API.USER);
}

export function setUser<T extends TUserChange>(data: T) {
  return axiosInstanse.put<T, TUserAPI>(API.USER, data);
}

export async function userLogin<T extends TLoginParams>(data: T) {
  const response = await axiosInstanse.post<T, TLoginSignupAPI>(API.LOGIN, data);

  if (response?.token) {
    Cookies.set('token', response.token);
    axiosInstanse.defaults.headers.Authorization = `Bearer ${response.token}`;
  }

  return response.user;
}

export function userLogout() {
  Cookies.remove('token');
  delete axiosInstanse.defaults.headers.Authorization;
}

export async function userSignup<T extends TSignupParams>(data: T) {
  const response = await axiosInstanse.post<T, TLoginSignupAPI>(API.SIGNUP, data);

  if (response?.token) {
    Cookies.set('token', response.token);
    axiosInstanse.defaults.headers.Authorization = `Bearer ${response.token}`;
  }

  return response.user;
}

export function forgotPassword(email: string) {
  return axiosInstanse.post<{email: string}, TForgotPasswordAPI>(API.FORGOT_PASSWORD, { email });
}

type AddQuestionParams = {
  email: string
  message: string
  name: string
  subject: 'Собщения на email'
}

export function addQuestion<T extends AddQuestionParams>(data: T) {
  return axiosInstanse.post<T, {message: string}>(API.ADD_QUESTION, data);
}
