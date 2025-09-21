import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { StorageStats } from '../components/StorageStats';
import { File, StorageStats as StorageStatsType } from '../types';
import { apiClient } from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Image, Video, Music, Archive, HardDrive, BarChart3, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const Analytics: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [storageStats, setStorageStats] = useState<StorageStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [fetchedFiles, stats] = await Promise.all([
        apiClient.getFiles(1000, 0), // Get all files for analytics
        apiClient.getStorageStats()
      ]);
      
      setFiles(fetchedFiles);
      setStorageStats(stats);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch analytics data';
      toast.error(message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    };

    loadData();
  }, []);

  const getFileTypeIcon = (mimeType: string | null) => {
    if (!mimeType) return <HardDrive className="w-4 h-4" />;
    if (mimeType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (mimeType.startsWith('video/')) return <Video className="w-4 h-4" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (mimeType === 'application/pdf') return <FileText className="w-4 h-4" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-4 h-4" />;
    return <HardDrive className="w-4 h-4" />;
  };

  const getFileTypeName = (mimeType: string | null) => {
    if (!mimeType) return 'Other';
    if (mimeType.startsWith('image/')) return 'Images';
    if (mimeType.startsWith('video/')) return 'Videos';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType === 'application/pdf') return 'PDFs';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'Archives';
    return 'Other';
  };

  // Process data for charts
  const fileTypeData = files.reduce((acc, file) => {
    const type = getFileTypeName(file.blob.mimeType);
    const existing = acc.find(item => item.name === type);
    
    if (existing) {
      existing.count += 1;
      existing.size += file.blob.size;
    } else {
      acc.push({
        name: type,
        count: 1,
        size: file.blob.size,
        icon: getFileTypeIcon(file.blob.mimeType)
      });
    }
    
    return acc;
  }, [] as Array<{ name: string; count: number; size: number; icon: React.ReactNode }>);

  // Monthly upload data
  const monthlyData = files.reduce((acc, file) => {
    const date = new Date(file.uploadedAt);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.files += 1;
      existing.size += file.blob.size;
    } else {
      acc.push({
        month,
        files: 1,
        size: file.blob.size
      });
    }
    
    return acc;
  }, [] as Array<{ month: string; files: number; size: number }>);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  if (isLoading) {
    return (
      <Layout currentPage="analytics">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="analytics">
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
              <BarChart3 className="w-8 h-8 text-blue-400 mr-4" style={{ filter: 'drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))' }} />
              <span className="bebas-neue apple-gradient-text">ANALYTICS</span>
            </h1>
            <p className="text-xl text-gray-400">
              Insights into your file storage and usage patterns
            </p>
          </div>

          {/* Storage Statistics */}
          {storageStats && (
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl bebas-neue apple-gradient-text tracking-wide">STORAGE OVERVIEW</h2>
              </div>
              <StorageStats stats={storageStats} />
            </div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* File Types Distribution */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                  <PieChartIcon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl bebas-neue apple-gradient-text tracking-wide">FILE TYPES DISTRIBUTION</h3>
              </div>
            {fileTypeData.length > 0 ? (
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fileTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {fileTypeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {fileTypeData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between bg-black/20 rounded-xl p-3">
                      <div className="flex items-center space-x-3">
                        <div style={{ color: COLORS[index % COLORS.length] }}>
                          {item.icon}
                        </div>
                        <span className="text-sm text-gray-300 font-medium">{item.name}</span>
                      </div>
                      <div className="text-sm text-white font-semibold">
                        {item.count} files ({(item.size / 1024 / 1024).toFixed(1)} MB)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <HardDrive className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">No files to analyze</p>
              </div>
            )}
            </div>

            {/* Monthly Upload Trends */}
            <div className="glass-bento rounded-3xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl bebas-neue apple-gradient-text tracking-wide">UPLOAD TRENDS</h3>
              </div>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'files' ? `${value} files` : `${(value / 1024 / 1024).toFixed(1)} MB`,
                      name === 'files' ? 'Files' : 'Size'
                    ]}
                  />
                  <Bar dataKey="files" fill="#3B82F6" name="files" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <BarChart className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">No upload data available</p>
              </div>
            )}
            </div>
          </div>

          {/* File Statistics Table */}
          <div className="glass-bento rounded-3xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl bebas-neue apple-gradient-text tracking-wide">FILE TYPE BREAKDOWN</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      File Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Average Size
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {fileTypeData.map((item, index) => (
                    <tr key={item.name} className="hover:bg-black/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div style={{ color: COLORS[index % COLORS.length] }} className="mr-3">
                            {item.icon}
                          </div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {(item.size / 1024 / 1024).toFixed(1)} MB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {(item.size / item.count / 1024).toFixed(1)} KB
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
