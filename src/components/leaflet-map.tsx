
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  popupText?: string;
  locationName?: string; // Added to use in popup
}

// Declare L globally for TypeScript to recognize it from the CDN script
declare global {
  interface Window {
    L: any; // Use 'any' or install @types/leaflet if you prefer stricter typing
  }
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  zoom = 13,
  popupText,
  locationName
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // To store the map instance
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof window.L !== 'undefined') {
      setIsLeafletLoaded(true);
    } else {
      // Poll for Leaflet object if it's not immediately available
      const interval = setInterval(() => {
        if (typeof window.L !== 'undefined') {
          setIsLeafletLoaded(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (isLeafletLoaded && mapContainerRef.current && !mapInstanceRef.current) {
      // Ensure map is initialized only once
      const map = window.L.map(mapContainerRef.current).setView([latitude, longitude], zoom);
      mapInstanceRef.current = map; // Store map instance

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const finalPopupText = popupText || locationName || `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
      window.L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(finalPopupText)
        .openPopup();
    }

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletLoaded, latitude, longitude, zoom, popupText, locationName]); // Rerun effect if these props change

  if (!isLeafletLoaded) {
    return (
        <div style={{ height: '400px', width: '100%' }} className="flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Loading map...</p>
        </div>
    );
  }

  return <div ref={mapContainerRef} style={{ height: '400px', width: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}></div>;
};

export default LeafletMap;
