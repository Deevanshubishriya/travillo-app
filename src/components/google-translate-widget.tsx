
"use client";

import Script from 'next/script';
import { useEffect } from 'react';

export function GoogleTranslateWidget() {
  useEffect(() => {
    // Define the init function globally if it's not already defined
    // This ensures it's available when the Google script calls it.
    if (!(window as any).googleTranslateElementInit) {
      (window as any).googleTranslateElementInit = function googleTranslateElementInit() {
        // Check if google.translate is available before using it
        if ((window as any).google && (window as any).google.translate) {
          new (window as any).google.translate.TranslateElement(
            { pageLanguage: 'en' },
            'google_translate_element'
          );
        } else {
          console.error('Google Translate library not fully loaded.');
        }
      };
    }
    // If the script is already loaded and googleTranslateElementInit was defined
    // after the script tried to call it, call it manually.
    // This can happen with fast script loading or specific Next.js rendering.
    if ((window as any).google && (window as any).google.translate && 
        document.getElementById('google_translate_element') && 
        !document.getElementById('google_translate_element')?.hasChildNodes()) {
        (window as any).googleTranslateElementInit();
    }

  }, []);

  return (
    <>
      <div className="py-8 text-center">
        <label htmlFor="google_translate_element" className="block font-semibold mb-3 text-lg text-foreground">
          Select Language:
        </label>
        <div
          id="google_translate_element"
          className="inline-block mt-2 p-1 border border-input rounded-md bg-background shadow-sm min-h-[40px]"
        >
          {/* Google Translate will populate this div */}
        </div>
      </div>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        id="google-translate-script"
        onError={(e) => {
          console.error('Google Translate script failed to load.', e);
        }}
        // No onLoad needed here as the cb=googleTranslateElementInit handles it
      />
    </>
  );
}
