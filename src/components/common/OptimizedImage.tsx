import React, { useState } from 'react';
import { getOptimizedImageSources } from '../../utils/imageCompressor';
import { Eye, ImageOff } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: '4/3' | '16/9' | '1/1' | 'auto';
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  objectFit?: 'cover' | 'contain';
  onClick?: (e: React.MouseEvent) => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  aspectRatio = 'auto',
  fallbackTitle,
  fallbackSubtitle,
  objectFit = 'cover',
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { webpSrc, fallbackSrc } = getOptimizedImageSources(src);

  const aspectClass = 
    aspectRatio === '4/3' ? 'aspect-[4/3]' :
    aspectRatio === '16/9' ? 'aspect-[16/9]' :
    aspectRatio === '1/1' ? 'aspect-square' : '';

  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <div 
      className={`relative overflow-hidden bg-slate-950 ${aspectClass} ${containerClassName}`}
      onClick={onClick}
    >
      {/* Shimmer loading skeleton */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center pointer-events-none z-10"
          aria-hidden="true"
        >
          <div className="w-6 h-6 rounded-full border-2 border-slate-700 border-t-amber-500 animate-spin opacity-60" />
        </div>
      )}

      {/* Error state fallback */}
      {hasError ? (
        <div className="w-full h-full min-h-[100px] flex flex-col items-center justify-center bg-slate-900 p-4 text-center">
          <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 mb-2">
            <ImageOff className="w-4 h-4 text-slate-400" />
          </div>
          {fallbackTitle ? (
            <span className="text-xs font-semibold text-slate-300 line-clamp-1">{fallbackTitle}</span>
          ) : (
            <span className="text-xs font-semibold text-slate-300 line-clamp-1">{alt}</span>
          )}
          {fallbackSubtitle && (
            <span className="text-[11px] text-slate-500 line-clamp-1 font-mono mt-0.5">{fallbackSubtitle}</span>
          )}
        </div>
      ) : (
        <picture>
          {/* Modern lightweight WebP format */}
          {webpSrc !== fallbackSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <img
            src={fallbackSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              // Try fallback or trigger error state
              setHasError(true);
            }}
            className={`w-full h-full ${fitClass} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          />
        </picture>
      )}
    </div>
  );
};
