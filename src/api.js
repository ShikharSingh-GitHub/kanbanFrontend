import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://kanban-backend-three.vercel.app';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export { api as default, setAuthToken };
