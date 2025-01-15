import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';
import { FileWithPreview } from '../types';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-gray-600">
        <Upload className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
        </p>
        <p className="text-sm text-gray-500 text-center">
          or click to select a file<br />
          (PDF or Image files up to 10MB)
        </p>
      </div>
    </div>
  );
}