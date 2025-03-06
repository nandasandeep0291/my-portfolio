// src/components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 animate-pulse"></div>
        {/* Inner spinner */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        {/* Loading text */}
        <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-gray-600 whitespace-nowrap">
          Loading posts...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
