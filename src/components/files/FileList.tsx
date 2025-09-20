import React from 'react';
import { FileItem } from '../../types';
import { FileCard } from './FileCard';

interface FileListProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onTogglePublic: (file: FileItem) => void;
  onShare?: (file: FileItem) => void;
  loading?: boolean;
}

export function FileList({ 
  files, 
  onDownload, 
  onDelete, 
  onTogglePublic,
  onShare,
  loading = false 
}: FileListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-24 sm:h-32" />
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📁</div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No files found</h3>
        <p className="text-sm sm:text-base text-gray-600">Upload your first file to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {files.map(file => (
        <FileCard
          key={file.id}
          file={file}
          onDownload={onDownload}
          onDelete={onDelete}
          onTogglePublic={onTogglePublic}
          onShare={onShare}
        />
      ))}
    </div>
  );
}