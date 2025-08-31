// src/api/ambulance.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Get all ambulances (for admin)
// api/ambulance.js
export const getAmbulances = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return {
        success: true,
        data: response.data || [] // Ensure array fallback
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        data: []
      };
    }
  };

// Get nearby ambulances (public)
export const getNearbyAmbulances = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { latitude, longitude }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby ambulances:', error);
    throw error;
  }
};

// Create new ambulance (admin)
export const createAmbulance = async (ambulanceData, token) => {
  try {
    const response = await axios.post(`${API_URL}/`, ambulanceData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating ambulance:', error);
    throw error;
  }
};

// Update ambulance (admin)
export const updateAmbulance = async (id, ambulanceData, token) => {
  try {
    const response = await axios.put(`${API_URL}/`, ambulanceData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating ambulance:', error);
    throw error;
  }
};

// Delete ambulance (admin)
export const deleteAmbulance = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting ambulance:', error);
    throw error;
  }
};

// Update ambulance location (driver)
export const updateAmbulanceLocation = async (ambulanceId, location, token) => {
  try {
    const response = await axios.patch(
      `${API_URL}/`,
      location,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating ambulance location:', error);
    throw error;
  }
};

export const trackAmbulance = async (ambulanceId) => {
  try {
    const response = await axios.get(`/api/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Other ambulance-related API functions...



