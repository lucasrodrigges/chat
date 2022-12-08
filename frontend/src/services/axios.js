import axios from 'axios';
import { getFromLS } from './localstorage';

export default axios.create({
  baseURL: `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_BASE_URL}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getFromLS('token'),
  },
});
