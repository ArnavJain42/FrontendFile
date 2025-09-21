import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { FileList } from '../components/FileList';
import { File } from '../types';
import { apiClient } from '../lib/api';
import { Files as FilesIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const Files: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchFiles = async (pageNum: number = 0, append: boolean = false) => {
    try {
      const fetchedFiles = await apiClient.getFiles(20, pageNum * 20);
      
      if (append) {
        setFiles(prev => [...prev, ...fetchedFiles]);
      } else {
        setFiles(fetchedFiles);
      }
      
      setHasMore(fetchedFiles.length === 20);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch files';
      toast.error(message);
    }
  };

  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true);
      await fetchFiles(0, false);
      setIsLoading(false);
    };

    loadFiles();
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFiles(nextPage, true);
  };

  const handleFileUpdate = () => {
    fetchFiles(0, false);
    setPage(0);
  };

  const handleFileDelete = () => {
    fetchFiles(0, false);
    setPage(0);
  };

  if (isLoading && files.length === 0) {
    return (
      <Layout currentPage="files">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="files">
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
              <FilesIcon className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">MY FILES</span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage and organize your uploaded files
            </p>
          </div>

          {/* Files List */}
          <div className="glass-bento rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                <FilesIcon className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl bebas-neue apple-gradient-text tracking-wide">FILE COLLECTION</h2>
            </div>
            <FileList
              files={files}
              onFileUpdate={handleFileUpdate}
              onFileDelete={handleFileDelete}
            />
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                {isLoading ? 'Loading...' : 'Load More Files'}
              </button>
            </div>
          )}

          {!hasMore && files.length > 0 && (
            <div className="text-center text-gray-400 py-8">
              <p className="text-lg">You've reached the end of your files</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
