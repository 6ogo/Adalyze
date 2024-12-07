import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_CONFIG } from '../config/auth';

const api = axios.create({
  baseURL: AUTH_CONFIG.baseURL,
  withCredentials: true,
});

// Add request interceptor for auth token
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/refresh', { refreshToken });
          localStorage.setItem('token', response.data.token);
          if (error.config.headers) {
            error.config.headers.Authorization = `Bearer ${response.data.token}`;
          }
          return axios(error.config);
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/auth';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;