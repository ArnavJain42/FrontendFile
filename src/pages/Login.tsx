import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue:wght@400&display=swap');
        .bebas-neue { font-family: 'Bebas Neue', cursive; }
        .glass-bento {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .glass-bento:hover {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(147, 197, 253, 0.1);
          transform: translateY(-8px);
        }
        .apple-gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to landing */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="glass-bento rounded-3xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">WELCOME BACK</span>
            </h1>
            <p className="text-gray-400">Sign in to your <span className="bebas-neue text-white">balkanID</span> account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                label="Email"
                error={errors.email?.message}
                className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  label="Password"
                  error={errors.password?.message}
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0 hover:bg-gray-200"
            >
              {isLoading ? (
                <span className="text-black">Signing In...</span>
              ) : (
                <span className="text-black">Sign In</span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-black/20 rounded-xl border border-gray-600">
            <p className="text-white text-sm font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Email: alice@example.com</p>
              <p>Password: hunter2</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
