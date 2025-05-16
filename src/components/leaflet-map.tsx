
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script'; // Import next/script

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  popupText?: string;
  locationName?: string;
}

declare global {
  interface Window {
    L: any;
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
  const mapInstanceRef = useRef<any>(null);
  const [isLeafletScriptLoaded, setIsLeafletScriptLoaded] = useState(false);

  useEffect(() => {
    // This effect now only runs when the script is loaded and map needs initialization/update
    if (isLeafletScriptLoaded && typeof window.L !== 'undefined' && mapContainerRef.current) {
      if (!mapInstanceRef.current) { // Initialize map only once
        const map = window.L.map(mapContainerRef.current).setView([latitude, longitude], zoom);
        mapInstanceRef.current = map;

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const finalPopupText = popupText || locationName || `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        window.L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(finalPopupText)
          .openPopup();
      } else { // If map instance exists, just update its view (e.g., if props change)
        mapInstanceRef.current.setView([latitude, longitude], zoom);
        // Potentially update marker and popup if necessary, though for this use case, setView might be enough.
      }
    }

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLeafletScriptLoaded, latitude, longitude, zoom, popupText, locationName]);

  if (!isLeafletScriptLoaded) {
    return (
      <>
        <Script
          src="https://unpkg.com/leaflet/dist/leaflet.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Leaflet JS loaded successfully via LeafletMap component.');
            setIsLeafletScriptLoaded(true);
          }}
          onError={(e) => {
            console.error('Failed to load Leaflet JS via LeafletMap component:', e);
            // Potentially set an error state here to show a message to the user
          }}
        />
        <div style={{ height: '400px', width: '100%' }} className="flex items-center justify-center bg-muted rounded-md">
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </>
    );
  }

  return <div ref={mapContainerRef} style={{ height: '400px', width: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}></div>;
};

export default LeafletMap;
