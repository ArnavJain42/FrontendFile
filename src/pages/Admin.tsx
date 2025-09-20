import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, Users, HardDrive, Activity } from 'lucide-react';
import { FileItem, PaginatedResponse } from '../types';
import { api } from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { FileList } from '../components/files/FileList';
import { formatBytes } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Admin() {
  const { user } = useAuth();
  const [files, setFiles] = useState<PaginatedResponse<FileItem>>({
    data: [],
    total: 0,
    page: 1,
    limit: 20,
    hasMore: false
  });
  const [systemStats, setSystemStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesData, statsData] = await Promise.all([
          api.getAllFiles(),
          api.getSystemStats()
        ]);
        setFiles(filesData);
        setSystemStats(statsData);
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) {
      fetchData();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return <Navigate to="/app/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const chartData = systemStats ? [
    { name: 'Original', value: systemStats.originalSize / (1024 * 1024), fill: '#EF4444' },
    { name: 'Deduplicated', value: systemStats.deduplicatedSize / (1024 * 1024), fill: '#3B82F6' },
    { name: 'Saved', value: systemStats.savings / (1024 * 1024), fill: '#10B981' }
  ] : [];

  const handleDownload = async (file: FileItem) => {
    // Admin download logic
  };

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Are you sure you want to delete "${file.filename}"?`)) return;
    
    try {
      await api.deleteFile(file.id);
      const updatedFiles = await api.getAllFiles();
      setFiles(updatedFiles);
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleTogglePublic = async (file: FileItem) => {
    try {
      await api.toggleFilePublic(file.id);
      const updatedFiles = await api.getAllFiles();
      setFiles(updatedFiles);
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-sm sm:text-base text-gray-600">System-wide overview and file management.</p>
      </div>

      {/* System stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold">{systemStats?.totalUsers || 0}</p>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-xs sm:text-sm font-medium">Total Files</p>
                <p className="text-xl sm:text-2xl font-bold">{systemStats?.totalFiles || 0}</p>
              </div>
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm font-medium">Storage Used</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {formatBytes(systemStats?.deduplicatedSize || 0, 1)}
                </p>
              </div>
              <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm font-medium">Space Saved</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {Math.round(systemStats?.savingsPercentage || 0)}%
                </p>
              </div>
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System storage chart */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">System Storage Overview</h2>
        </CardHeader>
        <CardContent>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(value as number).toFixed(1)} MB`, 'Size']} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-600">
            System-wide deduplication has saved {formatBytes(systemStats?.savings || 0)} 
            ({Math.round(systemStats?.savingsPercentage || 0)}%) across all users.
          </div>
        </CardContent>
      </Card>

      {/* All files management */}
      <Card>
        <CardHeader>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">All Files</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage files across all users. Exercise caution when deleting files.
          </p>
        </CardHeader>
        <CardContent>
          <FileList
            files={files.data}
            onDownload={handleDownload}
            onDelete={handleDelete}
            onTogglePublic={handleTogglePublic}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}