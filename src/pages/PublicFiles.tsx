import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { File } from '../types';
import { Layout } from '../components/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Search, Download, User, Calendar, HardDrive, Globe, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export const PublicFiles: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [searching, setSearching] = useState(false);

  const loadPublicFiles = async (userEmail?: string) => {
    try {
      setLoading(true);
      let publicFiles: File[];
      if (userEmail && userEmail.trim()) {
        // Search by user email
        publicFiles = await apiClient.searchPublicFilesByEmail(50, 0, userEmail.trim());
      } else {
        // Get all public files
        publicFiles = await apiClient.getPublicFiles(50, 0);
      }
      setFiles(publicFiles);
    } catch (error) {
      console.error('Error loading public files:', error);
      toast.error('Failed to load public files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicFiles();
  }, []);

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      loadPublicFiles();
      return;
    }

    try {
      setSearching(true);
      await loadPublicFiles(searchEmail.trim());
    } catch (error) {
      console.error('Error searching files:', error);
      toast.error('Failed to search files');
    } finally {
      setSearching(false);
    }
  };

  const handleDownload = async (file: File) => {
    try {
      const blob = await apiClient.downloadFile(file.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Layout currentPage="public-files">
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
              <Globe className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">PUBLIC FILES</span>
            </h1>
            <p className="text-xl text-gray-400">
              Browse and download files shared publicly by users
            </p>
          </div>

          {/* Search Section */}
          <div className="glass-bento rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <Search className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">SEARCH FILES</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  label="Search by user email"
                  placeholder="Enter user email to filter files..."
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-black/20 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={searching}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Search className="w-4 h-4" />
                <span>{searching ? 'Searching...' : 'Search'}</span>
              </Button>
            </div>
          </div>

          {/* Files List */}
          <div className="glass-bento rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl bebas-neue apple-gradient-text tracking-wide">PUBLIC FILES</h2>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="ml-3 text-gray-400">Loading public files...</span>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12">
                <HardDrive className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No public files found</h3>
                <p className="text-gray-400">
                  {searchEmail ? 'No files found for the specified user email.' : 'No public files are available at the moment.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">
                    {searchEmail ? `Files by ${searchEmail}` : 'All Public Files'} ({files.length})
                  </h3>
                </div>

                <div className="grid gap-6">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="glass-bento rounded-2xl p-6 hover:bg-white/12 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-4">
                            <h4 className="text-lg font-medium text-white">
                              {file.filename}
                            </h4>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                              Public
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-blue-400" />
                              <span>{file.uploader?.email || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <HardDrive className="w-4 h-4 text-purple-400" />
                              <span>{formatFileSize(file.size)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-400" />
                              <span>{formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Download className="w-4 h-4 text-orange-400" />
                              <span>{file.downloadCount} downloads</span>
                            </div>
                          </div>

                          {file.tags && file.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {file.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button
                            onClick={() => handleDownload(file)}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
                          >
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
