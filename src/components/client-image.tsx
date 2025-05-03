'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface ClientImageProps extends ImageProps {
  fallbackSrc?: string;
}

/**
 * Client-side wrapper for next/image to handle onError event.
 * Defaults to a grayscale blurred placeholder on error.
 */
export function ClientImage({
  src,
  fallbackSrc = 'https://picsum.photos/400/300?grayscale&blur=2', // Default fallback
  alt,
  ...props
}: ClientImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
        setImgSrc(fallbackSrc);
        setHasError(true);
        console.warn(`Image failed to load: ${src}. Falling back to ${fallbackSrc}`);
    }
  };

  // If the original src changes, reset the error state and try loading the new src
  if (src !== imgSrc && !hasError) {
     setImgSrc(src);
     setHasError(false);
  }
   // If src becomes null/undefined after initially having a value, reset
   if (!src && imgSrc) {
     setImgSrc(fallbackSrc);
     setHasError(true);
   }


  return (
    <Image
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
