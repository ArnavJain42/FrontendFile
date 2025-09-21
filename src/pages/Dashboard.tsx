import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';
import { StorageStats } from '../components/StorageStats';
import { File, StorageStats as StorageStatsType } from '../types';
import { apiClient } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Globe, Upload, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Dashboard: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [storageStats, setStorageStats] = useState<StorageStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upload' | 'files'>('upload');

  const fetchFiles = async () => {
    try {
      const fetchedFiles = await apiClient.getFiles(100, 0);
      setFiles(fetchedFiles);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch files';
      toast.error(message);
    }
  };

  const fetchStorageStats = async () => {
    try {
      const stats = await apiClient.getStorageStats();
      setStorageStats(stats);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch storage stats';
      toast.error(message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchFiles(), fetchStorageStats()]);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleUploadComplete = () => {
    // Refresh files and stats after upload
    fetchFiles();
    fetchStorageStats();
  };

  const handleFileUpdate = () => {
    fetchFiles();
    fetchStorageStats();
  };

  const handleFileDelete = () => {
    fetchFiles();
    fetchStorageStats();
  };

  if (isLoading) {
    return (
      <Layout currentPage="dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="dashboard">
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
              <Upload className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">DASHBOARD</span>
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Manage your files and view storage analytics
            </p>
            <Link to="/public-files">
              <Button className="bg-white text-black px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-0 hover:bg-gray-200 flex items-center space-x-2">
                <Globe className="w-5 h-5 text-black" />
                <span className="text-black">Browse Public Files</span>
              </Button>
            </Link>
          </div>

          {/* Storage Statistics */}
          {storageStats && (
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl bebas-neue apple-gradient-text tracking-wide">STORAGE OVERVIEW</h2>
              </div>
              <StorageStats stats={storageStats} />
            </div>
          )}

          {/* Tabs */}
          <div className="glass-bento rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl bebas-neue apple-gradient-text tracking-wide">FILE MANAGEMENT</h2>
            </div>
            
            <div className="border-b border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'upload'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  Upload Files
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'files'
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
                  }`}
                >
                  Recent Files
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'upload' ? (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Upload New Files</h3>
                <FileUpload
                  onUploadComplete={handleUploadComplete}
                  onUploadStart={() => {
                    // Could show loading state here
                  }}
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Recent Files</h3>
                <FileList
                  files={files.slice(0, 10)} // Show only recent 10 files
                  onFileUpdate={handleFileUpdate}
                  onFileDelete={handleFileDelete}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
