import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload as UploadIcon, CheckCircle } from 'lucide-react';
import { UploadProgress as UploadProgressType } from '../types';
import { api } from '../lib/api';
import { DropZone } from '../components/upload/DropZone';
import { UploadProgress } from '../components/upload/UploadProgress';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

export function Upload() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploads, setUploads] = useState<UploadProgressType[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      await api.uploadFiles(selectedFiles, (progress) => {
        setUploads(progress);
      });

      toast.success(`Successfully uploaded ${selectedFiles.length} files!`);
      
      // Reset state after successful upload
      setTimeout(() => {
        setSelectedFiles([]);
        setUploads([]);
        setIsUploading(false);
      }, 2000);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
      setIsUploading(false);
    }
  };

  const allUploadsCompleted = uploads.length > 0 && uploads.every(u => u.status === 'completed');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Files</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Select multiple files to upload. FileVault will automatically detect duplicates and save storage space.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Upload area */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <DropZone
              onFilesSelected={handleFilesSelected}
              selectedFiles={selectedFiles}
              onRemoveFile={removeFile}
              disabled={isUploading}
            />
          </CardContent>
        </Card>

        {/* Upload controls */}
        {selectedFiles.length > 0 && !allUploadsCompleted && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Ready to upload {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
            </p>
            <div className="flex space-x-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setSelectedFiles([])}
                disabled={isUploading}
                className="flex-1 sm:flex-none"
              >
                Clear All
              </Button>
              <Button
                onClick={handleUpload}
                loading={isUploading}
                disabled={selectedFiles.length === 0}
                className="flex-1 sm:flex-none"
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </div>
        )}

        {/* Upload progress */}
        {uploads.length > 0 && (
          <UploadProgress uploads={uploads} />
        )}

        {/* Success actions */}
        {allUploadsCompleted && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-green-900">Upload Complete!</h3>
                  <p className="text-sm sm:text-base text-green-700">
                    All files have been uploaded successfully. What would you like to do next?
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/app/files')}
                  className="w-full sm:w-auto"
                >
                  View Files
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedFiles([]);
                    setUploads([]);
                    setIsUploading(false);
                  }}
                  className="w-full sm:w-auto"
                >
                  Upload More
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}