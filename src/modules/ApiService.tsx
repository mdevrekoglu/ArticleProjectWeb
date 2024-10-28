// services/ApiService.ts
import axios, { AxiosInstance } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    // Interceptor to add token to each request if present
    this.axiosInstance.interceptors.request.use(
      config => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  // Method to set the token after login
  setToken(token: string) {
    this.token = token;
  }

  // Clear token for logout
  clearToken() {
    this.token = null;
  }

  // usePost: Creates a POST request with generics
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

  // useGet: Creates a GET request with generics
  async UseGet<TResponse>(url: string): Promise<TResponse> {
    try {
      const response = await this.axiosInstance.get<TResponse>(url);
      return response.data;
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  }
}

// Export a singleton instance of ApiService
// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService('http://localhost:5055/api');
