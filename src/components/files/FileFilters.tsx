import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FileFilter } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface FileFiltersProps {
  filter: FileFilter;
  onFilterChange: (filter: FileFilter) => void;
  onReset: () => void;
}

export function FileFilters({ filter, onFilterChange, onReset }: FileFiltersProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const updateFilter = (updates: Partial<FileFilter>) => {
    onFilterChange({ ...filter, ...updates });
  };

  const hasActiveFilters = Object.keys(filter).some(key => {
    const value = filter[key as keyof FileFilter];
    return value !== undefined && value !== null && value !== '';
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search files by name..."
            leftIcon={<Search className="w-4 h-4" />}
            value={filter.search || ''}
            onChange={(e) => updateFilter({ search: e.target.value })}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex-1 sm:flex-none"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              onClick={onReset}
              className="flex-1 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              File Type
            </label>
            <select
              value={filter.mimeType || ''}
              onChange={(e) => updateFilter({ mimeType: e.target.value || undefined })}
              className="block w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All types</option>
              <option value="image/">Images</option>
              <option value="video/">Videos</option>
              <option value="audio/">Audio</option>
              <option value="application/pdf">PDF</option>
              <option value="text/">Text files</option>
              <option value="application/">Applications</option>
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Min Size (MB)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={filter.minSize ? filter.minSize / (1024 * 1024) : ''}
              onChange={(e) => updateFilter({ 
                minSize: e.target.value ? parseFloat(e.target.value) * 1024 * 1024 : undefined 
              })}
              className="block w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Max Size (MB)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={filter.maxSize ? filter.maxSize / (1024 * 1024) : ''}
              onChange={(e) => updateFilter({ 
                maxSize: e.target.value ? parseFloat(e.target.value) * 1024 * 1024 : undefined 
              })}
              className="block w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-2 text-xs sm:text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filter.isPublic || false}
                onChange={(e) => updateFilter({ isPublic: e.target.checked || undefined })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-xs sm:text-sm text-gray-700">Public files only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
