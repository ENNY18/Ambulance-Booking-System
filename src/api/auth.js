// src/api/auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAdminProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    throw error;
  }
};


export const register = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/`, credentials);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };