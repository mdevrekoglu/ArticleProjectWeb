import axios, { AxiosInstance } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    const baseURL =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:5055/api';

    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Interceptor to add token from local storage
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('authToken'); // Get token from local storage
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Add token if exists
        }
        console.log('Request with token:', config.headers.Authorization); // Debugging
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
      console.error('POST request error:', error);
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
      console.error('GET request error:', error);
      throw error;
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
