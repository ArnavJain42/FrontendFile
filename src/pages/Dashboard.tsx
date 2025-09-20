import React, { useState, useEffect } from 'react';
import { 
  Files, 
  HardDrive, 
  TrendingUp, 
  Users,
  Upload,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StorageStats } from '../types';
import { api } from '../lib/api';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { formatBytes } from '../lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStorageStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = stats ? [
    {
      name: 'Original Size',
      value: stats.originalSize / (1024 * 1024),
      fill: '#3B82F6'
    },
    {
      name: 'Deduplicated Size',
      value: stats.deduplicatedSize / (1024 * 1024),
      fill: '#14B8A6'
    },
    {
      name: 'Savings',
      value: stats.savings / (1024 * 1024),
      fill: '#F97316'
    }
  ] : [];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg" />
            ))}
          </div>
          <div className="h-80 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's an overview of your file storage.</p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <Link to="/app/upload">
          <Button className="flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
            <Upload className="w-4 h-4" />
            <span>Upload Files</span>
          </Button>
        </Link>
        <Link to="/app/files">
          <Button variant="outline" className="flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
            <Files className="w-4 h-4" />
            <span>Browse Files</span>
          </Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm font-medium">Total Files</p>
                <p className="text-xl sm:text-2xl font-bold">{stats?.totalFiles || 0}</p>
              </div>
              <Files className="w-6 h-6 sm:w-8 sm:h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-xs sm:text-sm font-medium">Storage Used</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {formatBytes(stats?.deduplicatedSize || 0, 1)}
                </p>
              </div>
              <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-teal-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs sm:text-sm font-medium">Space Saved</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {formatBytes(stats?.savings || 0, 1)}
                </p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs sm:text-sm font-medium">Savings</p>
                <p className="text-xl sm:text-2xl font-bold">
                  {Math.round(stats?.savingsPercentage || 0)}%
                </p>
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage breakdown chart */}
      <Card>
        <CardHeader>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Storage Breakdown</h2>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value.toFixed(1)} MB`, 'Size']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs sm:text-sm text-gray-600">
            <p>
              <strong>Deduplication Savings:</strong> FileVault automatically detects duplicate files 
              and stores them only once, saving you {Math.round(stats?.savingsPercentage || 0)}% storage space.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quota usage */}
      {stats && (
        <Card className="mt-4 sm:mt-6">
          <CardHeader>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Quota Usage</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-gray-600">Storage Used</span>
              <span className="text-xs sm:text-sm font-medium">
                {formatBytes(stats.quotaUsed)} / {formatBytes(stats.quotaTotal)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((stats.quotaUsed / stats.quotaTotal) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {((stats.quotaUsed / stats.quotaTotal) * 100).toFixed(1)}% of quota used
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}