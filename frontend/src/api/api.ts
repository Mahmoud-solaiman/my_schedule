import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";


type CustomAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
}

type RefreshResponse = {
  token: string;
}

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.post<RefreshResponse>('/auth/refresh', {}, { withCredentials: true });

          const newToken = response.data.token;

          localStorage.setItem('token', newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return api(originalRequest);

        } catch (refreshError) {
          localStorage.removeItem('token');
          window.location.href = '/auth/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  }
)