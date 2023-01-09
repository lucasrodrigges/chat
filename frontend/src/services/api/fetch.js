import axios from 'axios';
import { getFromLS } from '../localstorage';

export default (route, method, body) => axios({
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
