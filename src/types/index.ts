export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Blob {
  id: string;
  sha256: string;
  sizeBytes: number;
  mimeType: string;
  refCount: number;
  createdAt: string;
}

export interface FileItem {
  id: string;
  userId: string;
  blobId: string;
  filename: string;
  declaredMime: string;
  uploadedAt: string;
  isPublic: boolean;
  downloadCount: number;
  folderId?: string;
  tags: string[];
  blob: Blob;
}

export interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId?: string;
}

export interface StorageStats {
  totalFiles: number;
  originalSize: number;
  deduplicatedSize: number;
  savings: number;
  savingsPercentage: number;
  quotaUsed: number;
  quotaTotal: number;
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  fileId?: string;
}

export interface FileFilter {
  search?: string;
  mimeType?: string;
  minSize?: number;
  maxSize?: number;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  isPublic?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}