import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'https://kanban-backend-three.vercel.app';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed. Please sign in again.');
      // Optionally redirect to login or show a toast
    }
    return Promise.reject(error);
  }
);

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export { api as default, setAuthToken };
