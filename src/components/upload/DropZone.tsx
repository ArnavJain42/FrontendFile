import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn, formatBytes } from '../../lib/utils';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  selectedFiles: File[];
  onRemoveFile: (index: number) => void;
  disabled?: boolean;
}

export function DropZone({ 
  onFilesSelected, 
  selectedFiles, 
  onRemoveFile,
  disabled = false 
}: DropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected([...selectedFiles, ...acceptedFiles]);
  }, [selectedFiles, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    disabled,
    multiple: true,
    maxSize: 50 * 1024 * 1024, // 50MB max file size
  });

  return (
    <div className="space-y-3 sm:space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer transition-all duration-200",
          isDragActive && !isDragReject && "border-blue-400 bg-blue-50",
          isDragReject && "border-red-400 bg-red-50",
          !isDragActive && "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center",
            isDragActive && !isDragReject && "bg-blue-100",
            isDragReject && "bg-red-100",
            !isDragActive && "bg-gray-100"
          )}>
            <Upload className={cn(
              "w-5 h-5 sm:w-6 sm:h-6",
              isDragActive && !isDragReject && "text-blue-600",
              isDragReject && "text-red-600",
              !isDragActive && "text-gray-600"
            )} />
          </div>
          
          <div>
            <p className="text-base sm:text-lg font-medium text-gray-900">
              {isDragActive
                ? isDragReject
                  ? "Some files are not supported"
                  : "Drop files here"
                : "Drag & drop files here"
              }
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              or <span className="text-blue-600 font-medium">browse</span> to choose files
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Max file size: 50MB
            </p>
          </div>
        </div>
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-sm sm:text-base font-medium text-gray-900">
            Selected Files ({selectedFiles.length})
          </h3>
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 max-h-48 sm:max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-2 px-2 sm:px-3 bg-white rounded-md shadow-sm mb-2 last:mb-0"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <File className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {formatBytes(file.size)} • {file.type || 'Unknown type'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFile(index)}
                  className="ml-1 sm:ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={disabled}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}