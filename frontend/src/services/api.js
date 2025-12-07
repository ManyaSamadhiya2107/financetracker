import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json' },
});

const api = {
  setToken: (token) => {
    if (token) instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    else delete instance.defaults.headers.common['Authorization'];
  },
  post: (url, data) => instance.post(url, data).then(r => r.data),
  get: (url, params) => instance.get(url, { params }).then(r => r.data),
  put: (url, data) => instance.put(url, data).then(r => r.data),
  delete: (url) => instance.delete(url).then(r => r.data),
};

export default api;
