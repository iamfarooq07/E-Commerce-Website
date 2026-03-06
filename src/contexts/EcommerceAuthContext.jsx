import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EcommerceAuthContext = createContext();

export const useEcommerceAuth = () => {
  const context = useContext(EcommerceAuthContext);
  if (!context) {
    throw new Error("useEcommerceAuth must be used within EcommerceAuthProvider");
  }
  return context;
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function EcommerceAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Axios instance with interceptors
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request interceptor - add token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('ecommerce_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        logout();
      }
      return Promise.reject(error);
    }
  );

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('ecommerce_token');
      const storedUser = localStorage.getItem('ecommerce_user');

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          // Optionally verify token with backend
          await fetchUserProfile();
        } catch (err) {
          console.error('Error loading user:', err);
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/ecommerce/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('ecommerce_user', JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      throw err;
    }
  };

  // Register
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/ecommerce/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        const { user, token, supabaseToken } = response.data;
        
        // Store tokens
        localStorage.setItem('ecommerce_token', token);
        localStorage.setItem('ecommerce_user', JSON.stringify(user));
        
        // Optional: Store Supabase token for RLS
        if (supabaseToken) {
          localStorage.setItem('supabase_token', supabaseToken);
        }

        setUser(user);
        return { success: true, user };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/ecommerce/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        const { user, token, supabaseToken } = response.data;
        
        // Store tokens
        localStorage.setItem('ecommerce_token', token);
        localStorage.setItem('ecommerce_user', JSON.stringify(user));
        
        // Optional: Store Supabase token for RLS
        if (supabaseToken) {
          localStorage.setItem('supabase_token', supabaseToken);
        }

        setUser(user);
        return { success: true, user };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('ecommerce_token');
    localStorage.removeItem('ecommerce_user');
    localStorage.removeItem('supabase_token');
    setUser(null);
    navigate('/login');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await api.put('/ecommerce/auth/profile', profileData);

      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('ecommerce_user', JSON.stringify(response.data.user));
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Update failed';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const response = await api.put('/ecommerce/auth/password', {
        currentPassword,
        newPassword
      });

      return { success: response.data.success, message: response.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'Password update failed';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    fetchUserProfile,
    api, // Expose api instance for other API calls
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isVendor: user?.role === 'vendor'
  };

  return (
    <EcommerceAuthContext.Provider value={value}>
      {children}
    </EcommerceAuthContext.Provider>
  );
}
