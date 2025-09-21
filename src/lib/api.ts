import { GraphQLResponse, User, File, FileMetaInput, UpdateFileInput, StorageStats } from '../types';

const API_BASE_URL = 'http://localhost:8080';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    query: string,
    variables: Record<string, any> = {},
    operationName?: string
  ): Promise<GraphQLResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'GraphQL error');
    }

    return data;
  }

  // Authentication
  async login(email: string, password: string): Promise<string> {
    const response = await this.request<{ login: string }>(
      `mutation { login(email: "${email}", password: "${password}") }`
    );
    return response.data.login;
  }

  async signup(email: string, password: string): Promise<User> {
    const response = await this.request<{ signup: User }>(
      `mutation { signup(email: "${email}", password: "${password}") { id email isAdmin createdAt } }`
    );
    return response.data.signup;
  }

  async getMe(): Promise<User> {
    const response = await this.request<{ me: User }>(
      'query { me { id email isAdmin createdAt } }'
    );
    return response.data.me;
  }

  // File operations
  async uploadFiles(files: globalThis.File[], metadata: FileMetaInput[]): Promise<File[]> {
    const formData = new FormData();
    
    // Create the GraphQL query
    const query = `
      mutation Upload($files: [Upload!]!, $meta: [FileMetaInput!]) {
        uploadFiles(files: $files, metadata: $meta) {
          id
          filename
          size
          uploadedAt
          isPublic
          blob {
            sha256
            size
            mimeType
          }
        }
      }
    `;

    const variables = {
      files: files.map(() => null),
      meta: metadata
    };

    formData.append('operations', JSON.stringify({ query, variables }));
    
    // Create the file map
    const map: Record<string, string[]> = {};
    files.forEach((_, index) => {
      map[index.toString()] = [`variables.files.${index}`];
    });
    formData.append('map', JSON.stringify(map));

    // Append files
    files.forEach((file, index) => {
      formData.append(index.toString(), file);
    });

    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}/query`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0]?.message || 'Upload error');
    }

    return data.data.uploadFiles;
  }

  async getFiles(limit: number = 20, offset: number = 0, onlyPublic: boolean = false): Promise<File[]> {
    const response = await this.request<{ files: File[] }>(
      `query { files(limit: ${limit}, offset: ${offset}, onlyPublic: ${onlyPublic}) {
        id
        filename
        size
        uploadedAt
        isPublic
        downloadCount
        blob {
          id
          sha256
          size
          mimeType
          refCount
        }
      } }`
    );
    return response.data.files;
  }

  async getFile(id: string): Promise<File> {
    const response = await this.request<{ file: File }>(
      `query { file(id: "${id}") {
        id
        filename
        size
        uploadedAt
        isPublic
        downloadCount
        blob {
          id
          sha256
          size
          mimeType
          refCount
        }
      } }`
    );
    return response.data.file;
  }

  async updateFile(id: string, input: UpdateFileInput): Promise<File> {
    // Build the input object string manually to avoid JSON.stringify issues
    const inputFields = [];
    if (input.filename !== undefined) {
      inputFields.push(`filename: "${input.filename}"`);
    }
    if (input.isPublic !== undefined) {
      inputFields.push(`isPublic: ${input.isPublic}`);
    }
    if (input.tags !== undefined) {
      const tagsStr = JSON.stringify(input.tags);
      inputFields.push(`tags: ${tagsStr}`);
    }
    
    const inputStr = `{ ${inputFields.join(', ')} }`;
    
    const response = await this.request<{ updateFile: File }>(
      `mutation { updateFile(fileID: "${id}", input: ${inputStr}) {
        id
        filename
        isPublic
        tags
      } }`
    );
    return response.data.updateFile;
  }

  async deleteFile(id: string): Promise<boolean> {
    const response = await this.request<{ deleteFile: boolean }>(
      `mutation { deleteFile(fileID: "${id}") }`
    );
    return response.data.deleteFile;
  }

  // Download file
  async downloadFile(id: string): Promise<Blob> {
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}/download/${id}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    return response.blob();
  }

  // Storage statistics
  async getStorageStats(): Promise<StorageStats> {
    // This would need to be implemented in the backend
    // For now, we'll calculate from the files list
    const files = await this.getFiles(1000, 0);
    
    const totalStorageUsed = files.reduce((sum, file) => sum + file.blob.size, 0);
    const originalStorageUsed = files.reduce((sum, file) => sum + file.size, 0);
    const storageSavings = originalStorageUsed - totalStorageUsed;
    const storageSavingsPercentage = originalStorageUsed > 0 ? (storageSavings / originalStorageUsed) * 100 : 0;
    
    // Count unique blobs (deduplicated files)
    const uniqueBlobs = new Set(files.map(file => file.blob.sha256));
    
    return {
      totalStorageUsed,
      originalStorageUsed,
      storageSavings,
      storageSavingsPercentage,
      fileCount: files.length,
      deduplicatedFileCount: uniqueBlobs.size,
    };
  }

  // Public files - get all public files
  async getPublicFiles(limit: number = 20, offset: number = 0): Promise<File[]> {
    const response = await this.request<{ files: File[] }>(
      `query { files(limit: ${limit}, offset: ${offset}, onlyPublic: true) {
        id
        filename
        size
        uploadedAt
        isPublic
        downloadCount
        tags
        blob {
          id
          sha256
          size
          mimeType
          refCount
        }
      } }`
    );
    return response.data.files;
  }

  // Search public files by user email
  async searchPublicFilesByEmail(limit: number = 20, offset: number = 0, userEmail: string): Promise<File[]> {
    const response = await this.request<{ publicFiles: File[] }>(
      `query { publicFiles(limit: ${limit}, offset: ${offset}, userEmail: "${userEmail}") {
        id
        filename
        size
        uploadedAt
        isPublic
        downloadCount
        tags
        blob {
          id
          sha256
          size
          mimeType
          refCount
        }
        uploader {
          id
          email
          isAdmin
          createdAt
        }
      } }`
    );
    return response.data.publicFiles;
  }
}

export const apiClient = new ApiClient();
