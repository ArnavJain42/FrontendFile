import { CheckCircle, Shield, Upload, Users, BarChart3, Zap, Lock, Globe } from 'lucide-react';

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

      <div className="relative z-10 max-w-full py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
          <h1 className="text-2xl sm:text-2xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-4 leading-tight tracking-tighter font-light flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
            Hello Team <span className="bebas-neue apple-gradient-text font-bold tracking-normal">balkanID</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-blue-400">
            Secure File Vault
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 ">
            from <span className="font-semibold text-blue-400 text-white">Arnav Jain</span>
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 px-4">
          {/* Hero Feature - Large */}
          <div className="lg:col-span-2 lg:row-span-2 rounded-3xl p-10 glass-bento">
            <div className="h-full flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="w-16 h-16 bg-blue-500/20 rounded-3xl flex items-center justify-center mb-8">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-3xl bebas-neue apple-gradient-text mb-6 tracking-wider">SMART UPLOAD SYSTEM</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">Advanced drag & drop with automatic content-addressed deduplication. Save up to 70% storage space with intelligent file management powered by <span className="bebas-neue text-white">balkanID</span>.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-4" />
                  <span className="text-base">Multi-file Upload Support</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-4" />
                  <span className="text-base">Real-time Progress Tracking</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-4" />
                  <span className="text-base">Automatic Deduplication</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="rounded-3xl p-8 glass-bento min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl bebas-neue apple-gradient-text mb-3 tracking-wide">ANALYTICS</h3>
            </div>
            <p className="text-gray-400 text-base">Real-time storage insights & usage statistics</p>
          </div>

          {/* Security */}
          <div className="rounded-3xl p-8 glass-bento min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl bebas-neue apple-gradient-text mb-3 tracking-wide">ENTERPRISE SECURITY</h3>
            </div>
            <p className="text-gray-400 text-base">Advanced encryption & access controls</p>
          </div>

          {/* Core Deliverables */}
          <div className="lg:col-span-2 rounded-3xl p-8 glass-bento min-h-[280px]">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl bebas-neue apple-gradient-text tracking-wide">CORE FEATURES</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreDeliverables.map((item, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* File Management */}
          <div className="rounded-3xl p-8 glass-bento min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-orange-400" />
              </div>
              <h3 className="text-xl bebas-neue apple-gradient-text mb-3 tracking-wide">FILE MANAGEMENT</h3>
            </div>
            <p className="text-gray-400 text-base">Advanced file organization and sharing controls</p>
          </div>

          {/* Mobile Responsive */}
          <div className="rounded-3xl p-8 glass-bento min-h-[180px] flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-pink-400" />
              </div>
              <h3 className="text-xl bebas-neue apple-gradient-text mb-3 tracking-wide">MOBILE READY</h3>
            </div>
            <p className="text-gray-400 text-base">Fully responsive design for all devices</p>
          </div>
        </div>

        {/* Bonus Deliverables */}
        <div className="rounded-3xl p-10 mb-12 mx-4 glass-bento">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
              <Globe className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-2xl bebas-neue apple-gradient-text tracking-wide">BONUS DELIVERABLES FOR <span className="bebas-neue">balkanID</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bonusDeliverables.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-base text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div className="rounded-3xl p-8 mb-12 mx-4 glass-bento">
          <h3 className="text-2xl bebas-neue apple-gradient-text mb-8 text-center tracking-wide">DEMO ACCESS FOR <span className="bebas-neue">balkanID</span> TEAM</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-2xl p-6 border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-blue-300 bebas-neue text-lg tracking-wide">REGULAR USER</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Email: <span className="font-mono text-white text-base">user@example.com</span></p>
                <p className="text-gray-400">Password: <span className="font-mono text-white text-base">demo123</span></p>
              </div>
            </div>
            <div className="bg-black/40 rounded-2xl p-6 border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-purple-300 bebas-neue text-lg tracking-wide">ADMIN USER</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Email: <span className="font-mono text-white text-base">admin@example.com</span></p>
                <p className="text-gray-400">Password: <span className="font-mono text-white text-base">demo123</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center px-4 mb-12">
          <button 
            className="bg-white text-black px-12 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-0 hover:bg-gray-200"
            onClick={() => window.location.href = '/login'}
          >
            Experience <span className="bebas-neue tracking-wide">balkanID</span> Now
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 px-4">
          <p className="text-base">Built with React, TypeScript & Modern Web Technologies for <span className="bebas-neue text-gray-300 tracking-wide">balkanID</span></p>
        </div>
      </div>
    </div>
  );
}