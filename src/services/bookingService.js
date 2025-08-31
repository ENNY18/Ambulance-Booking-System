// services/bookingService.js
import API from './api';

export const createBooking = async (bookingData) => {
  try {
    const response = await API.post('API', bookingData);
    console.log('Booking API response:', response.data);
    return response.data
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getBooking = async (id) => {
  try {
    const response = await API.get(`API/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status) => {
  try {
    const response = await API.patch(`API/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};

