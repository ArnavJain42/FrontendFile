import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '../types';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      setToken(storedToken);
      apiClient.setToken(storedToken);
      
      // Verify token by fetching user data
      apiClient.getMe()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Token is invalid, clear it
          localStorage.removeItem('auth_token');
          setToken(null);
          apiClient.setToken(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const authToken = await apiClient.login(email, password);
      
      // Store token
      localStorage.setItem('auth_token', authToken);
      setToken(authToken);
      apiClient.setToken(authToken);
      
      // Fetch user data
      const userData = await apiClient.getMe();
      setUser(userData);
      
      toast.success('Login successful!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await apiClient.signup(email, password);
      
      // After signup, automatically log in
      const authToken = await apiClient.login(email, password);
      
      localStorage.setItem('auth_token', authToken);
      setToken(authToken);
      apiClient.setToken(authToken);
      setUser(userData);
      
      toast.success('Account created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    apiClient.setToken(null);
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
