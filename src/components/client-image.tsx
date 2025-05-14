
'use client';

import Image, { type ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

// Omit 'src' from ImageProps as we'll handle it more directly, then add it back with specific typing
interface ClientImageProps extends Omit<ImageProps, 'src' | 'onError'> {
  src: string | null | undefined; // Allow src to be null or undefined
  fallbackSrc?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void; // Allow passing an onError handler
}

export function ClientImage({
  src: srcProp,
  fallbackSrc = 'https://picsum.photos/400/300?grayscale&blur=2', // Default fallback
  alt,
  onError: onErrorProp, // Capture external onError if provided
  ...props
}: ClientImageProps) {
  // Determine the initial source: use srcProp if valid, otherwise fallback.
  // Also, set initial error state if srcProp is initially invalid.
  const initialEffectiveSrc = srcProp || fallbackSrc;
  const initialHasLoadError = !srcProp;

  const [effectiveSrc, setEffectiveSrc] = useState(initialEffectiveSrc);
  const [hasLoadError, setHasLoadError] = useState(initialHasLoadError);

  useEffect(() => {
    if (srcProp) {
      // If srcProp is valid and different from current effectiveSrc (or if error was previously set), update.
      if (srcProp !== effectiveSrc || hasLoadError) {
        setEffectiveSrc(srcProp);
        setHasLoadError(false); // Reset error state
      }
    } else {
      // If srcProp is falsy (null, undefined, empty string), use fallback.
      if (effectiveSrc !== fallbackSrc || !hasLoadError) {
        setEffectiveSrc(fallbackSrc);
        setHasLoadError(true);
      }
    }
  }, [srcProp, fallbackSrc, effectiveSrc, hasLoadError]); // Dependencies ensure effect runs on prop changes

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Check if we are not already displaying the fallback due to a previous error with the same srcProp.
    // This helps prevent potential loops if the fallbackSrc itself is problematic,
    // and ensures console warning happens once per problematic srcProp.
    if (!hasLoadError || effectiveSrc !== fallbackSrc) {
      console.warn(`Image failed to load: "${srcProp}". Falling back to "${fallbackSrc}".`);
      setEffectiveSrc(fallbackSrc);
      setHasLoadError(true);
    }
    if (onErrorProp) { // Call external onError if provided
      onErrorProp(event);
    }
  };

  return (
    <Image
      src={effectiveSrc} // This will always be a valid string (either srcProp or fallbackSrc)
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
