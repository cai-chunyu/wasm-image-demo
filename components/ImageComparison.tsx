'use client';

import { useState } from 'react';

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string | null;
  isProcessing: boolean;
}

export default function ImageComparison({
  originalImage,
  processedImage,
  isProcessing,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
        {processedImage ? (
          <div className="relative h-[600px]">
            <img
              src={processedImage}
              alt="Processed"
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div
              className="absolute top-0 right-0 bottom-0 overflow-hidden"
              style={{ left: `${sliderPosition}%` }}
            >
              <img
                src={originalImage}
                alt="Original"
                className="absolute top-0 right-0 w-full h-full object-contain"
                style={{ 
                  width: `${(100 / (100 - sliderPosition)) * 100}%`,
                  maxWidth: 'none',
                  left: 'auto'
                }}
              />
            </div>
            
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-4v8" transform="rotate(90 12 12)" />
                </svg>
              </div>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
            />
          </div>
        ) : (
          <div className="relative h-[600px]">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-full object-contain"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-xl">处理中...</div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {processedImage && (
        <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>处理后</span>
          <span>原图</span>
        </div>
      )}
    </div>
  );
}