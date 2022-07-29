import axios from 'axios';

// 바뀐 로컬 주소 URL
const API_URL = 'http://localhost:5100';
export const CustomAxiosPost = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true,
});

export const CustomAxiosGet = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true,
});
