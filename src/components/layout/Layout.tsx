import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Home, Upload, Files, Settings, LogOut, Shield, HardDrive } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white/10 backdrop-blur-md border-r border-white/20 shadow-2xl z-20 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : ' -translate-x-full lg:translate-x-0'}`}
        aria-hidden={!sidebarOpen && window.innerWidth < 1024}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-white/20">
            <h1 className="text-lg sm:text-xl font-bold text-white">FileVault</h1>
            <p className="text-xs sm:text-sm text-white/70 truncate">{user.email}</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                location.pathname.startsWith(item.href + '/');

              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white border-r-2 border-blue-400'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" aria-hidden />
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
              onClick={handleLogout}
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header (simple) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-3">
        <button
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen((s) => !s)}
          className="p-2 bg-white/10 rounded"
        >
          {/* simple hamburger */}
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="text-white font-semibold">FileVault</div>
        <div />
      </div>

      {/* Main content */}
      <div className="ml-0 lg:ml-64 relative z-10 min-h-screen">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}
    </div>
  );
}
