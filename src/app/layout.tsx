
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/auth-context'; // Import AuthProvider
import Script from 'next/script'; // Import next/script


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
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider> {/* Wrap with AuthProvider */}
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            
          </AuthProvider>
        </ThemeProvider>

        {/* Botpress Webchat Scripts */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v1/inject.js"
          strategy="afterInteractive"
        />
        <Script
          id="botpress-webchat-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.botpressWebChat.init({
                "composerPlaceholder": "Ask me anything!",
                "botConversationDescription": "Travillo",
                "botId": "7d93db89-5ddd-48ac-91c7-d5f35eae9bdc",
                "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
                "messagingUrl": "https://messaging.botpress.cloud",
                "clientId": "7d93db89-5ddd-48ac-91c7-d5f35eae9bdc",
                "webhookId": "c874de53-fdf6-4bee-bd45-30a736b1a42e",
                "lazySocket": true,
                "themeName": "prism",
                "botName": "Travillo Bot",
                "avatarUrl": "https://previews.123rf.com/images/hgucuk/hgucuk2012/hgucuk201200075/161468561-world-tourism-the-tour-guide-%C3%A4%C2%B0con-design.jpg",
                "stylesheet": "https://webchat-styler-css.botpress.app/prod/28032111-a170-4e9e-be60-9c9222f20935/v72246/style.css",
                "frontendVersion": "v1",
                "useSessionStorage": true,
                "enableConversationDeletion": true,
                "theme": "prism",
                "themeColor": "#2563eb",
                "allowedOrigins": []
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
