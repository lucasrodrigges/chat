import axios from 'axios';
import { getFromLS } from './localstorage';

const apiFetch = axios.create({
  baseURL: `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getFromLS('token'),
  },
});

export const postLogin = async (body) => (
  apiFetch.post('/login', body)
    .then(({ status, data: { token } }) => ({ status, token }))
    .catch(({ response: { status, data: { message } } }) => ({ status, error: message }))
);

export const v = 'v';
