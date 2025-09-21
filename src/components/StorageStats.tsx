import React from 'react';
import { HardDrive, TrendingUp, File, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/Card';
import { StorageStats as StorageStatsType } from '../types';

interface StorageStatsProps {
  stats: StorageStatsType;
}

export const StorageStats: React.FC<StorageStatsProps> = ({ stats }) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(1);
  };

  const getSavingsColor = (percentage: number) => {
    if (percentage >= 50) return 'text-green-600';
    if (percentage >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSavingsBgColor = (percentage: number) => {
    if (percentage >= 50) return 'bg-green-100';
    if (percentage >= 25) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Storage Used */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-white">Storage Used</h3>
          <HardDrive className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {formatBytes(stats.totalStorageUsed)}
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Deduplicated storage
          </p>
        </CardContent>
      </Card>

      {/* Original Storage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-white">Original Size</h3>
          <File className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {formatBytes(stats.originalStorageUsed)}
          </div>
          <p className="text-xs text-gray-300 mt-1">
            Without deduplication
          </p>
        </CardContent>
      </Card>

      {/* Storage Savings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-white">Storage Savings</h3>
          <TrendingUp className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {formatBytes(stats.storageSavings)}
          </div>
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getSavingsBgColor(stats.storageSavingsPercentage)} ${getSavingsColor(stats.storageSavingsPercentage)}`}>
            {formatPercentage(stats.storageSavingsPercentage)}% saved
          </div>
        </CardContent>
      </Card>

      {/* File Statistics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-white">File Statistics</h3>
          <BarChart3 className="h-4 w-4 text-indigo-400" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Total Files:</span>
              <span className="font-semibold text-white">{stats.fileCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Unique Blobs:</span>
              <span className="font-semibold text-white">{stats.deduplicatedFileCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Deduplication:</span>
              <span className="font-semibold text-white">
                {stats.fileCount > 0 ? formatPercentage((1 - stats.deduplicatedFileCount / stats.fileCount) * 100) : 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
