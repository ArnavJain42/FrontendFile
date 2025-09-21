export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Blob {
  id: string;
  sha256: string;
  size: number;
  mimeType: string;
  refCount: number;
}

export interface File {
  id: string;
  filename: string;
  size: number;
  uploadedAt: string;
  isPublic: boolean;
  downloadCount: number;
  blob: Blob;
  tags?: string[];
  uploader?: User;
}

export interface FileMetaInput {
  filename: string;
  declaredMime: string;
  isPublic: boolean;
}

export interface UpdateFileInput {
  filename?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface StorageStats {
  totalStorageUsed: number;
  originalStorageUsed: number;
  storageSavings: number;
  storageSavingsPercentage: number;
  fileCount: number;
  deduplicatedFileCount: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    path?: string[];
  }>;
}
