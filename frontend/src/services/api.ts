const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

export interface ApiError {
  error: string;
  details?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
    console.log('API Service initialized with baseURL:', this.baseURL);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    try {
      console.log('API Service - Making request to:', url, 'with config:', config)
      const response = await fetch(url, config);
      
      console.log('API Service - Response status:', response.status, response.statusText)
      
      if (!response.ok) {
        const errorData: ApiError = await response.json();
        console.log('API Service - Error response:', errorData)
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('API Service - Success response:', responseData)
      return responseData;
    } catch (error) {
      console.log('API Service - Caught error:', error)
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<LoginResponse> {
    console.log('API Service - Login request:', { url: `${this.baseURL}/auth/login`, data })
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    return this.request<void>('/auth/logout', {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; version: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService(); 