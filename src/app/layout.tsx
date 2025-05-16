
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth-context';
import Script from 'next/script'; // Added back

export const metadata: Metadata = {
  title: 'Travillo - Discover Hidden Gems',
  description:
    'Explore lesser-known locations, book rentals, and find hotels with Travillo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        {/* Attempting to load Leaflet JS globally from layout */}
        <Script
          src="https://unpkg.com/leaflet/dist/leaflet.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Leaflet JS loaded successfully via layout.');
            // Note: This approach for notifying components can be unreliable.
            // LeafletMap component will check for window.L.
          }}
          onError={(e) => {
            console.error('Failed to load Leaflet JS via layout:', e);
          }}
        />
      </body>
    </html>
  );
}
