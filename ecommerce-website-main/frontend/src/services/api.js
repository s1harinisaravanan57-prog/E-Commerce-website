import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:8080/api' });

// attach Authorization header when token present
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` };
  return cfg;
});

export default api;
