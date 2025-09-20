import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { SignupForm } from '../components/auth/SignupForm';

export function Signup() {
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  const handleSignup = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await signup(data.email, data.password);
      navigate('/app/dashboard');
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return <SignupForm onSubmit={handleSignup} loading={loading} />;
}