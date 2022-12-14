import axios from 'axios';
import { getFromLS } from './localstorage';

const apiFetch = (route, method, body) => axios({
  url: `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_BASE_URL}${route}`,
  method,
  data: body,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getFromLS('token'),
  },
})
  .then(({ status, data }) => ({ status, data }))
  .catch(({ response: { status, data: { message } } }) => ({ status, error: message }));

export const postLogin = async (body) => apiFetch('/login', 'post', body);

export const getPosts = async (q = '', offset = 0) => (
  apiFetch(`/post/?q=${q}&offset=${offset}`, 'get')
);

export const getUsers = async (q = '', offset = 0) => (
  apiFetch(`/user/?q=${q}&offset=${offset}`, 'get')
);
