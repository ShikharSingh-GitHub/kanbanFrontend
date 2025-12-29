import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://kanban-backend-three.vercel.app';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
