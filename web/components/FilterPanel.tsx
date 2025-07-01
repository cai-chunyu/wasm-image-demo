'use client';

import { useState, useEffect } from 'react';

interface FilterPanelProps {
  originalImage: string;
  onFilterApply: (processedImage: string) => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

let wasmModule: any = null;

export default function FilterPanel({
  originalImage,
  onFilterApply,
  onProcessingChange,
}: FilterPanelProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      if (!wasmModule) {
        try {
          const wasm = await import('@/lib/wasm/rust_wasm');
          wasmModule = wasm;
        } catch (error) {
          console.error('Failed to load WASM module:', error);
        }
      }
    };
    loadWasm();
  }, []);

  const applyFilter = async (filterType: string) => {
    if (!wasmModule || !originalImage) return;

    setSelectedFilter(filterType);
    onProcessingChange(true);

    try {
      const img = new Image();
      img.onload = () => {
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
              processedBytes = wasmModule.apply_grayscale(rawPixels, canvas.width, canvas.height);
              break;
            case 'blur':
              processedBytes = wasmModule.apply_blur(rawPixels, canvas.width, canvas.height);
              break;
            case 'edge':
              processedBytes = wasmModule.apply_edge_detection(rawPixels, canvas.width, canvas.height);
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