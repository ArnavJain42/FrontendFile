import React from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { UploadProgress as UploadProgressType } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { formatBytes } from '../../lib/utils';

interface UploadProgressProps {
  uploads: UploadProgressType[];
}

export function UploadProgress({ uploads }: UploadProgressProps) {
  if (uploads.length === 0) return null;

  const completedCount = uploads.filter(u => u.status === 'completed').length;
  const errorCount = uploads.filter(u => u.status === 'error').length;
  const overallProgress = uploads.reduce((sum, upload) => sum + upload.progress, 0) / uploads.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Upload Progress</h3>
        <div className="text-xs sm:text-sm text-gray-600">
          {completedCount} of {uploads.length} completed
          {errorCount > 0 && (
            <span className="text-red-600 ml-2">({errorCount} failed)</span>
          )}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <ProgressBar
          value={overallProgress}
          variant={errorCount > 0 ? 'warning' : 'primary'}
          showLabel={false}
        />
      </div>

      <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
        {uploads.map((upload, index) => (
          <div
            key={`${upload.file.name}-${index}`}
            className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0">
              {upload.status === 'completed' && (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              )}
              {upload.status === 'error' && (
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              )}
              {upload.status === 'uploading' && (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 animate-spin" />
              )}
              {upload.status === 'pending' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                  {upload.file.name}
                </p>
                <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2 flex-shrink-0">
                  {formatBytes(upload.file.size)}
                </span>
              </div>
              
              {upload.status === 'error' && upload.error && (
                <p className="text-xs text-red-600 mb-1">{upload.error}</p>
              )}
              
              {upload.status !== 'pending' && upload.status !== 'completed' && (
                <ProgressBar
                  value={upload.progress}
                  size="sm"
                  variant={upload.status === 'error' ? 'error' : 'primary'}
                  showLabel={false}
                />
              )}
              
              {upload.status === 'completed' && (
                <p className="text-xs text-green-600">Upload completed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}