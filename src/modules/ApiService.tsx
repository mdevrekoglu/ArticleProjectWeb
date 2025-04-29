import { notification } from 'antd';
import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:5055/api';

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'repeat' }) // Custom serialization for arrays
    });

    // Interceptor to add token from local storage
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('authToken'); // Get token from local storage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add token if exists
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  // POST Request
  async UsePost<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.axiosInstance.post<TResponse>(url, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.title) {
        notification.error({
          message: 'An unexpected error occurred',
          description: error.response.data.title,
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
      } else {
        notification.error({
          message: 'An unexpected error occurred',
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
      }
      throw error;
    }
  }

  // GET Request
  async UseGet<TRequest, TResponse>(
    url: string,
    params: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.axiosInstance.get<TResponse>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.title) {
        notification.error({
          message: 'An unexpected error occurred',
          description: error.response.data.title,
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
      } else {
        notification.error({
          message: 'An unexpected error occurred',
          placement: 'topRight',
          duration: 5,
          style: { width: '400px' }
        });
      }
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
