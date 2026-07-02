import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async () => {
    try {
      // Direct redirect to Google OAuth - no need for pre-flight request
      window.location.href = `${API_URL}/api/v1/auth/google/login`;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/v1/auth/logout`);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCallback = async (code) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/auth/google/callback`, {
        params: { code }
      });
      
      if (response.data.success) {
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/dashboard');
        return { success: true };
      }
      return { success: false, error: 'Authentication failed' };
    } catch (error) {
      console.error('Auth callback error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    logout,
    handleCallback,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
