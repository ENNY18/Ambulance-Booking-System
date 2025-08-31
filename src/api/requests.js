import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getRequests = async (token, status = '') => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { status },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignAmbulance = async (requestId, ambulanceId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/`,
      { ambulanceId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAvailableAmbulances = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

