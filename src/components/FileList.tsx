import React, { useState } from 'react';
import { 
  Download, 
  Trash2, 
  Eye, 
  EyeOff, 
  File, 
  Image, 
  FileText,
  Archive,
  Video,
  Music,
  Calendar,
  HardDrive,
  Users,
  Search
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Input } from './ui/Input';
import { File as FileType } from '../types';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface FileListProps {
  files: FileType[];
  onFileUpdate: () => void;
  onFileDelete: () => void;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onFileUpdate,
  onFileDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublic, setFilterPublic] = useState<'all' | 'public' | 'private'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />;
    if (mimeType.startsWith('video/')) return <Video className="w-5 h-5 text-purple-500" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-5 h-5 text-green-500" />;
    if (mimeType === 'application/pdf') return <FileText className="w-5 h-5 text-red-500" />;
    if (mimeType.includes('zip') || mimeType.includes('rar')) return <Archive className="w-5 h-5 text-orange-500" />;
    return <File className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
  };

  const handleDownload = async (file: FileType) => {
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
      const message = error instanceof Error ? error.message : 'Download failed';
      toast.error(message);
    }
  };

  const handleDelete = async (file: FileType) => {
    if (!window.confirm(`Are you sure you want to delete "${file.filename}"?`)) {
      return;
    }

    try {
      await apiClient.deleteFile(file.id);
      toast.success('File deleted successfully');
      onFileDelete();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Delete failed';
      toast.error(message);
    }
  };

  const handleTogglePublic = async (file: FileType) => {
    try {
      await apiClient.updateFile(file.id, {
        isPublic: !file.isPublic,
      });
      toast.success(`File is now ${!file.isPublic ? 'public' : 'private'}`);
      onFileUpdate();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      toast.error(message);
    }
  };

  // Filter and sort files
  const filteredFiles = files
    .filter((file) => {
      const matchesSearch = file.filename.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = 
        filterPublic === 'all' || 
        (filterPublic === 'public' && file.isPublic) ||
        (filterPublic === 'private' && !file.isPublic);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.filename.localeCompare(b.filename);
          break;
        case 'date':
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-white">Your Files</h2>
          
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            
            <select
              value={filterPublic}
              onChange={(e) => setFilterPublic(e.target.value as any)}
              className="px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/20 text-white"
            >
              <option value="all">All Files</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy as any);
                setSortOrder(newSortOrder as any);
              }}
              className="px-3 py-2 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/20 text-white"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="size-desc">Largest First</option>
              <option value="size-asc">Smallest First</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500">
              {searchTerm || filterPublic !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Upload your first file to get started'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center space-x-4 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                {/* File icon */}
                <div className="flex-shrink-0">
                  {getFileIcon(file.blob.mimeType)}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-white truncate">
                      {file.filename}
                    </h3>
                    {file.isPublic ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                        <Eye className="w-3 h-3 mr-1" />
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
                        <EyeOff className="w-3 h-3 mr-1" />
                        Private
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-300 mt-1">
                    <div className="flex items-center space-x-1">
                      <HardDrive className="w-3 h-3" />
                      <span>{formatFileSize(file.size)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(file.uploadedAt)}</span>
                    </div>
                    {file.downloadCount > 0 && (
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3" />
                        <span>{file.downloadCount} downloads</span>
                      </div>
                    )}
                    {file.blob.refCount > 1 && (
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>Shared {file.blob.refCount} times</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublic(file)}
                  >
                    {file.isPublic ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(file)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
