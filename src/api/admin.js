import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getAmbulances = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return {
      success: true,
      data: response.data || []
    };
  } catch (error) {
    return {
      success: false,
      data: []
    };
  }
};

export const getRequests = async (status = '') => {
  try {
    const response = await axios.get(`${API_URL}/`, {
      params: { status }
    });
    return {
      success: true,
      data: response.data || []
    };
  } catch (error) {
    return {
      success: false,
      data: []
    };
  }
};

export const getRecentActivity = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return {
        success: true,
        data: response.data?.data || []
      };
    } catch (error) {
      return {
        success: false,
        data: []
      };
    }
  };
  
  export const getAdminProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      return {
        success: true,
        data: response.data?.data || null
      };
    } catch (error) {
      return {
        success: false,
        data: null
      };
    }
  };