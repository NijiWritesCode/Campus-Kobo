import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Attach Authorization bearer token if present
api.interceptors.request.use(
  (config) => {
    try {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      // In case Zustand store is not ready
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses for auth errors & predictable error format
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    const customError = {
      status: error.response?.status || 500,
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      message:
        error.response?.data?.message ||
        error.message ||
        'Something went wrong. Please try again.',
      fieldErrors: error.response?.data?.fieldErrors || null,
      raw: error,
    };

    return Promise.reject(customError);
  }
);

export default api;
