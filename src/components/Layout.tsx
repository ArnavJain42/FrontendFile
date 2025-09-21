import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Files, 
  Globe,
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Upload Files', href: '/dashboard', icon: Upload, current: currentPage === 'dashboard' },
    { name: 'My Files', href: '/files', icon: Files, current: currentPage === 'files' },
    { name: 'Public Files', href: '/public-files', icon: Globe, current: currentPage === 'public-files' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: currentPage === 'analytics' },
    { name: 'Settings', href: '/settings', icon: Settings, current: currentPage === 'settings' },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
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

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col glass-bento shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-white bebas-neue apple-gradient-text">File Vault</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.email}</p>
                {user?.isAdmin && (
                  <div className="flex items-center text-xs text-blue-400">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full bg-white/10 border-gray-600 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow glass-bento border-r border-gray-700">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-white bebas-neue apple-gradient-text">File Vault</h1>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.email}</p>
                {user?.isAdmin && (
                  <div className="flex items-center text-xs text-blue-400">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full bg-white/10 border-gray-600 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between glass-bento border-b border-gray-700 px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white lg:hidden transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              Welcome back, <span className="text-white font-medium">{user?.email}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};
