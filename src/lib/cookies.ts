import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import { COOKIES_EXPIRY_TIME } from './constants';
import api from './api';
import type { User } from '@/types/api';

export const setSessionWithValue = (value: string, key: string) => {
  set(key, value);
};

export const getSessionWithKey = (key: string) => {
  return get(key);
};

export const removeSessionWithKey = (key: string) => {
  return remove(key);
};

const set = (key: string, value: string) => {
  const expiresIn = getSessionWithKey('expiresIn');
  const cookieTime: any = isEmpty(expiresIn) ? COOKIES_EXPIRY_TIME : expiresIn;

  Cookies.set(key, value, { expires: parseInt(cookieTime) });
};

const get = (key: string) => {
  return Cookies.get(key);
};

const remove = (key: string) => {
  return Cookies.remove(key);
};

export const setSession = (value: string | object, expiration: string = COOKIES_EXPIRY_TIME) => {
  set('___session', JSON.stringify(value));
  set('___session_expiration', expiration);
};

export const setSessionJsonWithValue = (value: any, key: string) => {
  set(key, JSON.stringify(value));
};

export const getSessionJsonWithKey = (key: string) => {
  return JSON.parse(get(key) as string);
};

export const getSession = () => {
  const session = get('___session');
  let jwt = null;

  if (typeof session === 'string') {
    jwt = !isEmpty(session) ? JSON.parse(session) : {};
  }

  return jwt;
};

export const clearSession = () => {
  remove('___session');
  remove('___session_expiration');
};

export const removeWithoutRedirect = () => {
  clearSession();
  removeSessionWithKey('token');
  removeSessionWithKey('expiresIn');
  removeSessionWithKey('token_info');
  api.setToken('');
};

export const removeWithRedirect = () => {
  removeWithoutRedirect();
  location.href = '/';
};

export const storeAuthData = (token: string, user: User) => {
  api.setToken(token);
  setSessionWithValue(token, 'token');
  setSession({ ...user });
  setSessionWithValue('7', 'expiresIn');
};
