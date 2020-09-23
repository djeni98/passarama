import axios from 'axios';

const api = axios.create({
  baseURL: 'https://djeni.pythonanywhere.com/',
})

export default api;
