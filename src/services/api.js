import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});



// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const adminLogin = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerAdmin = async (credentials) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const getRequests = async (params) => {
  const response = await api.get('/requests', { params });
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.put(`/requests/${id}/status`, { status });
  return response.data;
};

export const assignAmbulance = async (requestId, ambulanceId) => {
  const response = await api.put(`/requests/${requestId}/assign`, { ambulanceId });
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export default api;