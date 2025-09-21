# File Vault Frontend

A modern React + TypeScript frontend for the secure file management system with deduplication capabilities.

## Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with automatic token management
- **Protected routes** that redirect unauthenticated users
- **Login/Signup pages** with form validation using Zod
- **Persistent sessions** with localStorage token storage

### 📁 File Management
- **Drag & drop file upload** with support for multiple files
- **File type validation** and MIME type detection
- **Public/Private file sharing** with toggle controls
- **File listing** with search, filtering, and sorting
- **File deletion** with confirmation dialogs
- **File download** functionality

### 📊 Storage Analytics
- **Real-time storage statistics** showing:
  - Total storage used (deduplicated)
  - Original storage usage (without deduplication)
  - Storage savings in bytes and percentage
  - File count and deduplication metrics
- **Interactive charts** using Recharts:
  - File type distribution (pie chart)
  - Upload trends over time (bar chart)
  - File type breakdown table

### 🎨 Modern UI/UX
- **Glassmorphism design** with gradient backgrounds
- **Responsive layout** that works on all devices
- **Dark/light theme support** (ready for implementation)
- **Loading states** and error handling
- **Toast notifications** for user feedback

## Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **React Hook Form** with Zod validation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Dropzone** for file uploads
- **Recharts** for data visualization
- **React Hot Toast** for notifications
- **Date-fns** for date formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Card)
│   ├── FileUpload.tsx  # Drag & drop file upload component
│   ├── FileList.tsx    # File listing with search/filter
│   ├── StorageStats.tsx # Storage statistics display
│   ├── Layout.tsx      # Main layout with navigation
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── lib/               # Utility libraries
│   └── api.ts         # API client with GraphQL integration
├── pages/             # Page components
│   ├── Landing.tsx    # Landing page
│   ├── Login.tsx      # Login page
│   ├── Signup.tsx     # Signup page
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Files.tsx      # File management page
│   ├── Analytics.tsx  # Analytics and charts
│   └── Settings.tsx   # User settings
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared types
└── App.tsx            # Main app component with routing
```

## Key Components

### FileUpload Component
- Supports drag & drop and click to select
- Multiple file upload with progress tracking
- File type validation and MIME type detection
- Public/private toggle for each file
- Real-time upload status and error handling

### FileList Component
- Search functionality across file names
- Filter by public/private status
- Sort by name, date, or size
- File metadata display (size, date, download count)
- Deduplication information (refCount)
- Bulk actions for file management

### StorageStats Component
- Real-time storage metrics
- Deduplication savings visualization
- File count and unique blob statistics
- Color-coded savings indicators

### Analytics Page
- Interactive charts showing file type distribution
- Monthly upload trends
- Detailed file type breakdown table
- Storage usage patterns

## API Integration

The frontend integrates with the GraphQL backend through a centralized API client:

- **Authentication**: Login, signup, and token management
- **File Operations**: Upload, download, delete, update metadata
- **File Queries**: List files with pagination and filtering
- **Storage Stats**: Calculate deduplication metrics

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Environment Setup

Make sure your backend is running on `http://localhost:8080` or update the API_BASE_URL in `src/lib/api.ts`.

## Demo Credentials

- **Email**: alice@example.com
- **Password**: hunter2

## Features Implemented

✅ **User Authentication & Authorization**
✅ **Drag & Drop Multi-File Upload**
✅ **Content-Addressed Deduplication Display**
✅ **Advanced File Search & Filtering**
✅ **Storage Analytics & Quota Management**
✅ **Responsive Glassmorphism UI**
✅ **Real-time Upload Progress**
✅ **File Preview & Metadata**
✅ **Public/Private File Sharing**
✅ **Interactive Storage Charts**
✅ **Mobile-Optimized Interface**
✅ **Advanced File Management**

## Future Enhancements

- [ ] Admin panel for system overview
- [ ] Real-time notifications
- [ ] File versioning
- [ ] Advanced sharing options (expiration, password protection)
- [ ] Bulk file operations
- [ ] File preview in browser
- [ ] Advanced search with filters
- [ ] File organization with folders/tags
