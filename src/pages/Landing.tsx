import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Shield, Upload, Users, BarChart3, Zap, Lock, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Landing() {
  const coreDeliverables = [
    'User Authentication & Authorization',
    'Drag & Drop Multi-File Upload',
    'Content-Addressed Deduplication',
    'Advanced File Search & Filtering',
    'Storage Analytics & Quota Management',
    'Admin Panel & System Overview',
    'Responsive Glassmorphism UI',
    'Rate Limiting & Security'
  ];

  const bonusDeliverables = [
    'Real-time Upload Progress',
    'File Preview & Metadata',
    'Public/Private File Sharing',
    'Interactive Storage Charts',
    'Mobile-Optimized Interface',
    'Advanced File Management',
    'System-wide Statistics',
    'Modern Glass Design'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            Hello Team Balkan
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-200 mb-3 sm:mb-4 px-2">
            Secure File Vault
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 px-2">
            from <span className="font-semibold text-blue-300">Arnav Jain</span>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-blue-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Smart Upload</h3>
            <p className="text-sm sm:text-base text-white/70">Drag & drop with automatic deduplication</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Analytics</h3>
            <p className="text-sm sm:text-base text-white/70">Real-time storage insights & savings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center sm:col-span-2 lg:col-span-1">
            <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-300 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Secure</h3>
            <p className="text-sm sm:text-base text-white/70">Enterprise-grade security & privacy</p>
          </div>
        </div>

        {/* Deliverables Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Core Deliverables */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-6 h-6 text-green-400 mr-3" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Core Deliverables</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {coreDeliverables.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bonus Deliverables */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Bonus Deliverables</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {bonusDeliverables.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 mb-8 sm:mb-12 text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Demo Credentials</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <p className="text-blue-300 font-medium">Regular User</p>
              <p className="text-white/80">Email: user@example.com</p>
              <p className="text-white/80">Password: demo123</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <p className="text-purple-300 font-medium">Admin User</p>
              <p className="text-white/80">Email: admin@example.com</p>
              <p className="text-white/80">Password: demo123</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/login">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
            >
              Let's Get Started
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16 text-white/60">
          <p className="text-sm sm:text-base px-4">Built with React, TypeScript & Modern Web Technologies</p>
        </div>
      </div>
    </div>
  );
}