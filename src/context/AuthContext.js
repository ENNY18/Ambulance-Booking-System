import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchAdminProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get('API');
      setAdmin(response.data);
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role) => {
    const response = await axios.post('API', {
      name,
      email,
      password,
      role
    });
    localStorage.setItem('adminToken', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setAdmin(response.data);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await axios.post('API', { email, password });
    localStorage.setItem('adminToken', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setAdmin(response.data);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};




export const useAuth = () => useContext(AuthContext);
