'use client';

import { useState } from 'react';
import { applyGrayscale, applyBlur, applyEdgeDetection } from '@/lib/wasm-loader';

interface FilterPanelProps {
  originalImage: string;
  onFilterApply: (processedImage: string) => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

export default function FilterPanel({
  originalImage,
  onFilterApply,
  onProcessingChange,
}: FilterPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const applyFilter = async (filterType: string) => {
    if (!originalImage) return;

    setSelectedFilter(filterType);
    onProcessingChange(true);

    try {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const rawPixels = new Uint8Array(imageData.data);

          let processedBytes: Uint8Array;

          switch (filterType) {
            case 'grayscale':
              processedBytes = await applyGrayscale(rawPixels, canvas.width, canvas.height);
              break;
            case 'blur':
              processedBytes = await applyBlur(rawPixels, canvas.width, canvas.height);
              break;
            case 'edge':
              processedBytes = await applyEdgeDetection(rawPixels, canvas.width, canvas.height);
              break;
            default:
              return;
          }

          const processedImageData = new ImageData(
            new Uint8ClampedArray(processedBytes),
            canvas.width,
            canvas.height
          );
          ctx.putImageData(processedImageData, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              onFilterApply(url);
            }
            onProcessingChange(false);
          });
        }
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error applying filter:', error);
      onProcessingChange(false);
    }
  };

  const filters = [
    { id: 'grayscale', name: '灰度', icon: '⚫' },
    { id: 'blur', name: '模糊', icon: '🌫️' },
    { id: 'edge', name: '边缘检测', icon: '📐' },
  ];

  return (
    <div className="flex justify-center gap-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => applyFilter(filter.id)}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            selectedFilter === filter.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.name}
        </button>
      ))}
    </div>
  );
}