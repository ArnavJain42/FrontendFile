import React, { useState, useEffect } from 'react';
import { StorageStats } from '../types';
import { api } from '../lib/api';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { formatBytes } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export function Storage() {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStorageStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch storage stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80 bg-gray-200 rounded-lg" />
            <div className="h-80 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const pieData = stats ? [
    { name: 'Used Space', value: stats.deduplicatedSize, color: '#3B82F6' },
    { name: 'Available Space', value: stats.quotaTotal - stats.deduplicatedSize, color: '#E5E7EB' }
  ] : [];

  const barData = stats ? [
    { name: 'Original Size', value: stats.originalSize / (1024 * 1024), fill: '#EF4444' },
    { name: 'After Deduplication', value: stats.deduplicatedSize / (1024 * 1024), fill: '#3B82F6' },
    { name: 'Space Saved', value: stats.savings / (1024 * 1024), fill: '#10B981' }
  ] : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Storage Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Detailed breakdown of your storage usage and deduplication savings.
        </p>
      </div>

      {stats && (
        <>
          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card className="text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">
                  {stats.totalFiles}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Files</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-2">
                  {formatBytes(stats.originalSize)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Original Size</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-xl sm:text-2xl font-bold text-teal-600 mb-2">
                  {formatBytes(stats.deduplicatedSize)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Actual Usage</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">
                  {Math.round(stats.savingsPercentage)}%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Space Saved</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Storage usage pie chart */}
            <Card>
              <CardHeader>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Storage Usage</h2>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatBytes(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      <span className="text-xs sm:text-sm text-gray-600">Used</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {formatBytes(stats.deduplicatedSize)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full" />
                      <span className="text-xs sm:text-sm text-gray-600">Available</span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium">
                      {formatBytes(stats.quotaTotal - stats.deduplicatedSize)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deduplication savings */}
            <Card>
              <CardHeader>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Deduplication Impact</h2>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${(value as number).toFixed(1)} MB`, 'Size']} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-xs sm:text-sm text-gray-600">
                  <p>
                    <strong>You saved {formatBytes(stats.savings)}</strong> ({Math.round(stats.savingsPercentage)}%) 
                    through automatic deduplication of identical files.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Storage breakdown table */}
          <Card className="mt-4 sm:mt-6">
            <CardHeader>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Storage Details</h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700">Metric</th>
                      <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700">Value</th>
                      <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900">Total Files</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium">{stats.totalFiles}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">-</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900">Original Storage Size</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium">{formatBytes(stats.originalSize)}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">100%</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900">Deduplicated Size</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium text-blue-600">{formatBytes(stats.deduplicatedSize)}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-blue-600">
                        {((stats.deduplicatedSize / stats.originalSize) * 100).toFixed(1)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900">Space Saved</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium text-green-600">{formatBytes(stats.savings)}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-green-600">{Math.round(stats.savingsPercentage)}%</td>
                    </tr>
                    <tr>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900">Storage Quota</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-medium">{formatBytes(stats.quotaTotal)}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-right">
                        {((stats.deduplicatedSize / stats.quotaTotal) * 100).toFixed(1)}% used
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}