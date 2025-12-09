"use client";

import { type DragEvent, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { SUPPORTED_FILE_FORMATS } from "@/lib/constants";

export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  className?: string;
}

function FileUpload({
  onFileSelect,
  accept = ".pdf,image/*",
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed border-gray-300 rounded-lg p-12",
        "text-center cursor-pointer transition-colors",
        "hover:border-uw-purple hover:bg-gray-50",
        isDragging && "border-uw-purple bg-uw-purple/5",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Icon */}
      <div className="flex justify-center mb-4">
        <UploadIcon />
      </div>

      <p className="text-uw-purple font-semibold mb-1">
        Drag and drop your transcript
      </p>
      <p className="text-gray-500 text-sm">or click to browse files</p>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      className="w-10 h-10 text-uw-purple"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  );
}

function SupportedFormats() {
  return (
    <p className="text-center text-gray-500 text-sm mt-4">
      Supported formats: {SUPPORTED_FILE_FORMATS.join(", ")}.
    </p>
  );
}

export { FileUpload, SupportedFormats };
