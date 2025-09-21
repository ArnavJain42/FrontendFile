import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { FileMetaInput } from '../types';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

interface UploadFile {
  file: File;
  metadata: FileMetaInput;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

interface FileUploadProps {
  onUploadComplete?: (files: any[]) => void;
  onUploadStart?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadStart,
}) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map((file) => ({
      file,
      metadata: {
        filename: file.name,
        declaredMime: file.type || 'application/octet-stream',
        isPublic: false,
      },
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      progress: 0,
    }));

    setUploadFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md', '.json', '.csv'],
      'application/*': ['.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
    },
  });

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const updateFileMetadata = (id: string, updates: Partial<FileMetaInput>) => {
    setUploadFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, metadata: { ...file.metadata, ...updates } }
          : file
      )
    );
  };

  const handleUploadFiles = async () => {
    if (uploadFiles.length === 0) return;

    setIsUploading(true);
    onUploadStart?.();

    try {
      const filesToUpload = uploadFiles.filter((f) => f.status === 'pending');
      const files = filesToUpload.map((f) => f.file);
      const metadata = filesToUpload.map((f) => f.metadata);

      // Update status to uploading
      setUploadFiles((prev) =>
        prev.map((file) =>
          filesToUpload.some((f) => f.id === file.id)
            ? { ...file, status: 'uploading' as const, progress: 50 }
            : file
        )
      );

      const result = await apiClient.uploadFiles(files, metadata);

      // Update status to success
      setUploadFiles((prev) =>
        prev.map((file) =>
          filesToUpload.some((f) => f.id === file.id)
            ? { ...file, status: 'success' as const, progress: 100 }
            : file
        )
      );

      toast.success(`Successfully uploaded ${result.length} file(s)`);
      onUploadComplete?.(result);

      // Clear successful uploads after a delay
      setTimeout(() => {
        setUploadFiles((prev) => prev.filter((f) => f.status !== 'success'));
      }, 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      
      // Update status to error
      setUploadFiles((prev) =>
        prev.map((file) =>
          file.status === 'uploading'
            ? { ...file, status: 'error' as const, error: message }
            : file
        )
      );

      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'pending':
        return <File className="w-5 h-5 text-gray-400" />;
      case 'uploading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const pendingFiles = uploadFiles.filter((f) => f.status === 'pending');
  const canUpload = pendingFiles.length > 0 && !isUploading;

  return (
    <div className="space-y-6">
      {/* Drop zone */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive
                ? 'border-blue-400 bg-blue-500/20'
                : 'border-white/30 hover:border-white/50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg text-blue-400">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg text-white mb-2">
                  Drag & drop files here, or click to select
                </p>
                <p className="text-sm text-gray-300">
                  Supports images, PDFs, documents, and more
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File list */}
      {uploadFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Files to Upload</h3>
              {canUpload && (
                <Button onClick={handleUploadFiles} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : `Upload ${pendingFiles.length} file(s)`}
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {uploadFiles.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center space-x-4 p-3 border border-white/20 rounded-lg"
                >
                  {getStatusIcon(uploadFile.status)}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-white truncate">
                        {uploadFile.file.name}
                      </p>
                      <span className="text-xs text-gray-300">
                        {formatFileSize(uploadFile.file.size)}
                      </span>
                    </div>
                    
                    {uploadFile.status === 'error' && uploadFile.error && (
                      <p className="text-xs text-red-600 mt-1">{uploadFile.error}</p>
                    )}
                    
                    {uploadFile.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadFile.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Public/Private toggle */}
                    {uploadFile.status === 'pending' && (
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={uploadFile.metadata.isPublic}
                          onChange={(e) =>
                            updateFileMetadata(uploadFile.id, {
                              isPublic: e.target.checked,
                            })
                          }
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-600">Public</span>
                      </label>
                    )}

                    {/* Remove button */}
                    {uploadFile.status !== 'uploading' && (
                      <button
                        onClick={() => removeFile(uploadFile.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
