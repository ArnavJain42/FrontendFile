import { User, FileItem, StorageStats, FileFilter, PaginatedResponse, UploadProgress } from '../types';

// Mock API - replace with actual backend calls
const MOCK_DELAY = 800;

const mockDelay = (ms: number = MOCK_DELAY) => new Promise(resolve => setTimeout(resolve, ms));

// Mock current user
let currentUser: User | null = null;

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    isAdmin: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'admin@example.com',
    isAdmin: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const mockFiles: FileItem[] = [
  {
    id: '1',
    userId: '1',
    blobId: 'blob1',
    filename: 'project-proposal.pdf',
    declaredMime: 'application/pdf',
    uploadedAt: '2024-01-15T10:30:00Z',
    isPublic: false,
    downloadCount: 5,
    tags: ['work', 'documents'],
    blob: {
      id: 'blob1',
      sha256: 'abc123...',
      sizeBytes: 2048576,
      mimeType: 'application/pdf',
      refCount: 1,
      createdAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    userId: '1',
    blobId: 'blob2',
    filename: 'vacation-photo.jpg',
    declaredMime: 'image/jpeg',
    uploadedAt: '2024-01-20T15:45:00Z',
    isPublic: true,
    downloadCount: 12,
    tags: ['personal', 'photos'],
    blob: {
      id: 'blob2',
      sha256: 'def456...',
      sizeBytes: 1536000,
      mimeType: 'image/jpeg',
      refCount: 1,
      createdAt: '2024-01-20T15:45:00Z'
    }
  }
];

export const api = {
  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await mockDelay();
    
    // Simple mock authentication - check if user exists
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'demo123') {
      throw new Error('Invalid email or password');
    }
    
    currentUser = user;
    return { user, token: 'mock-jwt-token' };
  },

  async signup(email: string, password: string): Promise<{ user: User; token: string }> {
    await mockDelay();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    currentUser = newUser;
    return { user: newUser, token: 'mock-jwt-token' };
  },

  async getCurrentUser(): Promise<User | null> {
    await mockDelay(200);
    return currentUser;
  },

  async logout(): Promise<void> {
    await mockDelay(200);
    currentUser = null;
  },

  // Files
  async uploadFiles(files: File[], onProgress?: (progress: UploadProgress[]) => void): Promise<FileItem[]> {
    const uploadProgresses: UploadProgress[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }));

    if (onProgress) onProgress([...uploadProgresses]);

    const results: FileItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadProgresses[i].status = 'uploading';
      if (onProgress) onProgress([...uploadProgresses]);

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 20) {
        uploadProgresses[i].progress = progress;
        if (onProgress) onProgress([...uploadProgresses]);
        await mockDelay(100);
      }

      // Create mock file item
      const newFile: FileItem = {
        id: Math.random().toString(36).substr(2, 9),
        userId: currentUser?.id || '1',
        blobId: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        declaredMime: file.type,
        uploadedAt: new Date().toISOString(),
        isPublic: false,
        downloadCount: 0,
        tags: [],
        blob: {
          id: Math.random().toString(36).substr(2, 9),
          sha256: Math.random().toString(36),
          sizeBytes: file.size,
          mimeType: file.type,
          refCount: 1,
          createdAt: new Date().toISOString()
        }
      };

      mockFiles.push(newFile);
      results.push(newFile);
      
      uploadProgresses[i].status = 'completed';
      uploadProgresses[i].fileId = newFile.id;
      if (onProgress) onProgress([...uploadProgresses]);
    }

    return results;
  },

  async getFiles(filter?: FileFilter, page = 1, limit = 20): Promise<PaginatedResponse<FileItem>> {
    await mockDelay();
    
    let filteredFiles = [...mockFiles];
    
    if (filter?.search) {
      const search = filter.search.toLowerCase();
      filteredFiles = filteredFiles.filter(file => 
        file.filename.toLowerCase().includes(search) ||
        file.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    
    if (filter?.mimeType) {
      filteredFiles = filteredFiles.filter(file => file.declaredMime.includes(filter.mimeType!));
    }
    
    if (filter?.minSize) {
      filteredFiles = filteredFiles.filter(file => file.blob.sizeBytes >= filter.minSize!);
    }
    
    if (filter?.maxSize) {
      filteredFiles = filteredFiles.filter(file => file.blob.sizeBytes <= filter.maxSize!);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedFiles = filteredFiles.slice(start, end);

    return {
      data: paginatedFiles,
      total: filteredFiles.length,
      page,
      limit,
      hasMore: end < filteredFiles.length
    };
  },

  async getFile(id: string): Promise<FileItem | null> {
    await mockDelay();
    return mockFiles.find(file => file.id === id) || null;
  },

  async deleteFile(id: string): Promise<void> {
    await mockDelay();
    const index = mockFiles.findIndex(file => file.id === id);
    if (index > -1) {
      mockFiles.splice(index, 1);
    }
  },

  async toggleFilePublic(id: string): Promise<FileItem> {
    await mockDelay();
    const file = mockFiles.find(f => f.id === id);
    if (!file) throw new Error('File not found');
    file.isPublic = !file.isPublic;
    return file;
  },

  async getStorageStats(): Promise<StorageStats> {
    await mockDelay();
    const userFiles = mockFiles.filter(f => f.userId === currentUser?.id);
    const originalSize = userFiles.reduce((sum, file) => sum + file.blob.sizeBytes, 0);
    const deduplicatedSize = originalSize * 0.85; // Simulate 15% savings from deduplication
    const savings = originalSize - deduplicatedSize;
    
    return {
      totalFiles: userFiles.length,
      originalSize,
      deduplicatedSize,
      savings,
      savingsPercentage: (savings / originalSize) * 100,
      quotaUsed: deduplicatedSize,
      quotaTotal: 10485760 // 10MB default quota
    };
  },

  // Admin
  async getAllFiles(page = 1, limit = 20): Promise<PaginatedResponse<FileItem>> {
    await mockDelay();
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedFiles = mockFiles.slice(start, end);

    return {
      data: paginatedFiles,
      total: mockFiles.length,
      page,
      limit,
      hasMore: end < mockFiles.length
    };
  },

  async getSystemStats(): Promise<StorageStats & { totalUsers: number }> {
    await mockDelay();
    const originalSize = mockFiles.reduce((sum, file) => sum + file.blob.sizeBytes, 0);
    const deduplicatedSize = originalSize * 0.8; // Simulate 20% system-wide savings
    const savings = originalSize - deduplicatedSize;
    
    return {
      totalFiles: mockFiles.length,
      originalSize,
      deduplicatedSize,
      savings,
      savingsPercentage: (savings / originalSize) * 100,
      quotaUsed: deduplicatedSize,
      quotaTotal: mockUsers.length * 10485760, // 10MB per user
      totalUsers: mockUsers.length
    };
  }
};