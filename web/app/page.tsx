'use client';

import { useState, useCallback } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImageComparison from '@/components/ImageComparison';
import FilterPanel from '@/components/FilterPanel';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = useCallback((imageData: string) => {
    setOriginalImage(imageData);
    setProcessedImage(null);
  }, []);

  const handleFilterApply = useCallback((filteredImage: string) => {
    setProcessedImage(filteredImage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Rust WASM 图像处理 Demo
        </h1>
        
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-6">
            <FilterPanel
              originalImage={originalImage}
              onFilterApply={handleFilterApply}
              onProcessingChange={setIsProcessing}
            />
            
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
              isProcessing={isProcessing}
            />
            
            <div className="text-center">
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                上传新图片
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}