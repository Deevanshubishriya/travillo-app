
'use client';

import type { LngLatLike } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

interface MapboxMapProps {
  longitude: number;
  latitude: number;
  zoom?: number;
  accessToken: string;
  mapStyle?: string;
}

export function MapboxMap({
  longitude,
  latitude,
  zoom = 13,
  accessToken,
  mapStyle = 'mapbox://styles/mapbox/streets-v12',
}: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      console.error('Mapbox access token is missing.');
      return;
    }

    mapboxgl.accessToken = accessToken;

    if (mapRef.current || !mapContainerRef.current) return; // Initialize map only once or if container exists

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [longitude, latitude] as LngLatLike,
      zoom: zoom,
    });

    mapRef.current.on('load', () => {
      setMapLoaded(true);
      // Add a marker at the location
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(mapRef.current!);
    });

    // Add navigation control (zoom buttons, compass)
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [longitude, latitude, zoom, accessToken, mapStyle]);


  return (
    <div className="relative h-full w-full">
      {!accessToken && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/80">
          <p className="rounded-md bg-destructive p-2 text-center text-destructive-foreground">
            Mapbox Access Token is not configured. Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.
          </p>
        </div>
      )}
      <div ref={mapContainerRef} className="absolute inset-0" />
       {!mapLoaded && accessToken && (
         <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
           <p>Loading map...</p>
         </div>
       )}
    </div>
  );
}
