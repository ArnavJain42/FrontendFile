import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FileItem, FileFilter, PaginatedResponse } from '../types';
import { api } from '../lib/api';
import { FileList } from '../components/files/FileList';
import { FileFilters } from '../components/files/FileFilters';
import { Button } from '../components/ui/Button';

export function Files() {
  const [files, setFiles] = useState<PaginatedResponse<FileItem>>({
    data: [],
    total: 0,
    page: 1,
    limit: 20,
    hasMore: false
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FileFilter>({});

  const fetchFiles = async (newFilter?: FileFilter, page = 1) => {
    try {
      setLoading(true);
      const response = await api.getFiles(newFilter || filter, page);
      setFiles(response);
    } catch (error) {
      toast.error('Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFilterChange = (newFilter: FileFilter) => {
    setFilter(newFilter);
    fetchFiles(newFilter, 1);
  };

  const handleResetFilter = () => {
    const emptyFilter = {};
    setFilter(emptyFilter);
    fetchFiles(emptyFilter, 1);
  };

  const handleDownload = async (file: FileItem) => {
    toast.success(`Downloading ${file.filename}`);
    // In real implementation, this would trigger a download
  };

  const handleDelete = async (file: FileItem) => {
    if (!confirm(`Are you sure you want to delete "${file.filename}"?`)) return;

    try {
      await api.deleteFile(file.id);
      toast.success('File deleted successfully');
      fetchFiles(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const handleTogglePublic = async (file: FileItem) => {
    try {
      await api.toggleFilePublic(file.id);
      toast.success(`File is now ${file.isPublic ? 'private' : 'public'}`);
      fetchFiles(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update file visibility');
    }
  };

  const loadMore = () => {
    fetchFiles(filter, files.page + 1);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Files</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Browse and manage your uploaded files. Use filters to find specific files quickly.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 sm:mb-6">
        <FileFilters
          filter={filter}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilter}
        />
      </div>

      {/* Results summary */}
      <div className="mb-4 text-xs sm:text-sm text-gray-600">
        Showing {files.data.length} of {files.total} files
      </div>

      {/* File list */}
      <FileList
        files={files.data}
        onDownload={handleDownload}
        onDelete={handleDelete}
        onTogglePublic={handleTogglePublic}
        loading={loading}
      />

      {/* Load more */}
      {files.hasMore && (
        <div className="mt-6 sm:mt-8 text-center">
          <Button variant="outline" onClick={loadMore}>
            Load More Files
          </Button>
        </div>
      )}
    </div>
  );
}