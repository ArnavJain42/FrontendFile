import React from 'react';
import { MoreVertical, Download, Share2, Trash2, Eye, EyeOff } from 'lucide-react';
import { FileItem } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatBytes, formatDate, getMimeTypeIcon } from '../../lib/utils';

interface FileCardProps {
  file: FileItem;
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onTogglePublic: (file: FileItem) => void;
  onShare?: (file: FileItem) => void;
}

export function FileCard({ 
  file, 
  onDownload, 
  onDelete, 
  onTogglePublic,
  onShare 
}: FileCardProps) {
  const [showActions, setShowActions] = React.useState(false);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 min-w-0 flex-1">
            <div className="text-xl sm:text-2xl flex-shrink-0">
              {getMimeTypeIcon(file.declaredMime)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate" title={file.filename}>
                {file.filename}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {formatBytes(file.blob.sizeBytes)} • {formatDate(file.uploadedAt)}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs text-gray-400 space-y-1 sm:space-y-0">
                <span>{file.downloadCount} downloads</span>
                {file.isPublic && (
                  <span className="inline-flex items-center space-x-1 text-green-600">
                    <Eye className="w-3 h-3" />
                    <span>Public</span>
                  </span>
                )}
                {file.tags.length > 0 && (
                  <span>Tags: {file.tags.join(', ')}</span>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowActions(!showActions)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2"
            >
              <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-40 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => {
                    onDownload(file);
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                  Download
                </button>
                
                <button
                  onClick={() => {
                    onTogglePublic(file);
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                >
                  {file.isPublic ? (
                    <>
                      <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                      Make Public
                    </>
                  )}
                </button>

                {onShare && (
                  <button
                    onClick={() => {
                      onShare(file);
                      setShowActions(false);
                    }}
                    className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Share
                  </button>
                )}

                <hr className="my-1" />

                <button
                  onClick={() => {
                    onDelete(file);
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}