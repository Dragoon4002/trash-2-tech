
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFile = (file: File) => {
    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    
    // Pass the file to parent component
    onImageSelected(file);
  };

  const clearImage = () => {
    setPreviewImage(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <Card className={`p-6 border-2 ${dragActive ? 'border-primary border-dashed' : 'border-border'} transition-all duration-200`}>
      <div
        className="flex flex-col items-center justify-center w-full min-h-[200px] relative"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <div className="relative w-full h-full">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-[200px] object-contain rounded-md"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center text-center p-6">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drag & drop an image or click to browse
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Supported formats: JPG, PNG, GIF
              </p>
              <Button
                type="button"
                variant="secondary"
                onClick={handleButtonClick}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
            <input
              ref={inputRef}
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="hidden"
            />
          </>
        )}
      </div>
    </Card>
  );
};

export default ImageUploader;
