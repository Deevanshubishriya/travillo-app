
"use client";

import Script from 'next/script';

export function BotpressChat() {
  return (
    <Script
      src="https://cdn.botpress.cloud/webchat/v1/inject.js"
      strategy="afterInteractive"
      onLoad={() => {
        const botpress = (window as any).botpressWebChat;
        if (botpress && typeof botpress.init === 'function') {
          botpress.init({
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
        } else {
          console.error("Botpress WebChat SDK not available or init method missing after inject.js loaded.");
        }
      }}
      onError={(e: any) => {
        console.error('Failed to load Botpress inject.js script:', e);
      }}
    />
  );
}
