import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Shield, Bell, Palette, Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <Layout currentPage="settings">
      <div className="min-h-screen relative overflow-hidden" style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)'
      }}>
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

        <div className="relative z-10 space-y-8 p-4 lg:p-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">SETTINGS</span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your account preferences and settings
            </p>
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Settings */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">PROFILE</h2>
              </div>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value="user@example.com"
                  disabled
                  className="bg-black/20 border-gray-600 text-gray-400"
                />
                <Input
                  label="Display Name"
                  placeholder="Enter your display name"
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Button className="bg-white text-black hover:bg-gray-200">Save Changes</Button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">SECURITY</h2>
              </div>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Button className="bg-white text-black hover:bg-gray-200">Update Password</Button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Bell className="w-6 h-6 text-yellow-400" />
                </div>
                <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">NOTIFICATIONS</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-black/20"
                    />
                    <span className="text-sm text-gray-300">Email notifications for uploads</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-black/20"
                    />
                    <span className="text-sm text-gray-300">Storage quota warnings</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 bg-black/20"
                    />
                    <span className="text-sm text-gray-300">Weekly storage reports</span>
                  </label>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200">Save Preferences</Button>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <Palette className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">APPEARANCE</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Theme
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/20 text-white">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/20 text-white">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <Button className="bg-white text-black hover:bg-gray-200">Save Preferences</Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-bento rounded-3xl p-8 border-red-500/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl bebas-neue text-red-400 tracking-wide">DANGER ZONE</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white">Delete Account</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <Button className="bg-red-600 text-white hover:bg-red-700">Delete Account</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
