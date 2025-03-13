import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5173', // Fallback for local dev
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
