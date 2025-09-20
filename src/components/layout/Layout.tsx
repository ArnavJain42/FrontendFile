import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  Files, 
  Settings, 
  LogOut, 
  Shield,
  HardDrive
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Upload', href: '/app/upload', icon: Upload },
    { name: 'Files', href: '/app/files', icon: Files },
    { name: 'Storage', href: '/app/storage', icon: HardDrive },
    ...(user.isAdmin ? [{ name: 'Admin', href: '/app/admin', icon: Shield }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-2xl z-20 transform lg:translate-x-0 transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/20">
            <h1 className="text-lg sm:text-xl font-bold text-white">FileVault</h1>
            <p className="text-xs sm:text-sm text-white/70 truncate">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white border-r-2 border-blue-400'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User actions */}
          <div className="px-3 sm:px-4 py-3 sm:py-4 border-t border-white/20">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 text-xs sm:text-sm px-2 sm:px-3"
              onClick={logout}
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 relative z-10 min-h-screen">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-10 hidden" id="sidebar-overlay" />
    </div>
  );
}