
'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Head from 'next/head';

const FlipsterGallery = () => {
  const galleryImages = Array.from({ length: 10 }, (_, i) => ({
    src: `/uk/pic${String(i + 1).padStart(2, '0')}.jpg`, // Assumes images are in public/uk/
    // Fallback to picsum if local images are not found by the browser
    fallbackSrc: `https://picsum.photos/seed/uk_gallery_${i + 1}/600/400`,
    alt: `Uttarakhand Scene ${i + 1}`,
  }));

  // This effect will try to initialize Flipster once jQuery and the Flipster script are loaded.
  // The Script component's onLoad prop is more reliable for direct initialization.
  useEffect(() => {
    const initializeFlipster = () => {
      if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.flipster) {
        (window as any).jQuery('.carousel').flipster({
          style: 'carousel',
          spacing: -0.3,
        });
        console.log('Flipster initialized via useEffect.');
      } else {
        // Retry initialization after a short delay if jQuery or Flipster isn't ready yet
        // This is a fallback, primary initialization is via Script onLoad
        setTimeout(initializeFlipster, 500);
      }
    };
    // Initial call in case scripts are already loaded (e.g. fast cache)
    // initializeFlipster(); // Script onLoad is preferred
  }, []);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = event.currentTarget;
    const fallbackSrc = imgElement.dataset.fallback;
    if (fallbackSrc && imgElement.src !== fallbackSrc) {
      console.warn(`Image failed to load: ${imgElement.src}. Falling back to ${fallbackSrc}`);
      imgElement.src = fallbackSrc;
    }
  };

  return (
    <>
      <Head>
        {/*
          IMPORTANT: You need to download jquery.flipster.min.css
          and place it in your public/css/ directory for the gallery to style correctly.
          If you don't have this file, the layout might be broken.
          You can often find it alongside the jquery.flipster.min.js file.
        */}
        <link rel="stylesheet" href="/css/jquery.flipster.min.css" />
      </Head>
      <section className="gallary py-16 md:py-24 bg-muted/50" id="ReviewGallery">
        <div className="section__container gallary__container container mx-auto" data-aos="zoom-in">
          <div className="gallary__content text-center mb-12">
            <div>
              <h2 className="section__title text-3xl font-bold text-primary mb-4" data-aos="zoom-in">
                Our trip gallery that will inspire you
              </h2>
              <p className="section__subtitle text-lg text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
                Visual Stories of Adventure to Spark Your Imagination.<br />
                Get inspired for your next journey.
              </p>
              {/* "View All" button and its functionality is omitted for now
                <button className="btn btn-style mt-6 ..." id="btn-page" data-aos="zoom-in">View All</button>
              */}
            </div>
          </div>

          {/* The Flipster carousel structure */}
          <div className="hero" data-aos="fade-up">
            <div className="carousel">
              <ul>
                {galleryImages.map((image, index) => (
                  <li key={index}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      data-fallback={image.fallbackSrc}
                      onError={handleImageError}
                      className="mx-auto" // Basic styling, Flipster might override
                      style={{ maxWidth: '600px', maxHeight: '400px', objectFit: 'cover' }} // Example dimensions
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossOrigin="anonymous"
        strategy="afterInteractive" // Load jQuery after the page becomes interactive
      />
      <Script
        src="/js/jquery.flipster.min.js" // Assumes flipster JS is in public/js/
        strategy="lazyOnload" // Load after jQuery and when browser is idle
        onLoad={() => {
          console.log('jquery.flipster.min.js loaded');
          if (typeof window !== 'undefined' && (window as any).jQuery && (window as any).jQuery.fn.flipster) {
            try {
              (window as any).jQuery('.carousel').flipster({
                style: 'carousel',
                spacing: -0.3,
              });
              console.log('Flipster initialized via Script onLoad.');
            } catch (e) {
              console.error('Error initializing Flipster:', e);
            }
          } else {
            console.warn('jQuery or jQuery.fn.flipster not available when trying to initialize Flipster from Script onLoad.');
          }
        }}
        onError={() => {
          console.error('Failed to load jquery.flipster.min.js. Make sure it is in public/js/');
        }}
      />
    </>
  );
};

export default FlipsterGallery;
