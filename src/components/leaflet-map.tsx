
'use client';

import React, { useEffect, useRef } from 'react';
// Script import removed, as layout is now responsible for loading Leaflet JS

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  popupText?: string;
  locationName?: string;
}

declare global {
  interface Window {
    L: any; // Leaflet's global object
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
  const mapInstanceRef = useRef<any>(null); // To hold the map instance

  useEffect(() => {
    // Ensure Leaflet is loaded (window.L exists) and map container ref is available
    if (typeof window.L !== 'undefined' && mapContainerRef.current) {
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
      } else {
        // If map instance exists, just update its view
        mapInstanceRef.current.setView([latitude, longitude], zoom);
        // Update marker popup content if necessary
        const layers = mapInstanceRef.current._layers;
        for (const key in layers) {
            if (layers[key] instanceof window.L.Marker) {
                const finalPopupText = popupText || locationName || `Location at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                layers[key].setPopupContent(finalPopupText);
                // Optionally re-open popup if it was closed and content might have changed
                // if (!layers[key].isPopupOpen()) {
                //   layers[key].openPopup();
                // }
                break; 
            }
        }
      }
    } else if (!mapContainerRef.current) {
        console.warn("LeafletMap: mapContainerRef.current is null. Map cannot be initialized yet.");
    } else if (typeof window.L === 'undefined') {
        console.warn("LeafletMap: window.L (Leaflet) is not defined. Ensure Leaflet JS is loaded globally, typically in layout.tsx.");
    }

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, popupText, locationName]); // Rerun effect if these props change

  // Conditional rendering based on Leaflet library availability
  if (typeof window.L === 'undefined') {
    return (
      <div style={{ height: '400px', width: '100%' }} className="flex items-center justify-center bg-muted rounded-md">
        <p className="text-muted-foreground">Loading map library...</p>
      </div>
    );
  }

  return <div ref={mapContainerRef} style={{ height: '400px', width: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}></div>;
};

export default LeafletMap;
