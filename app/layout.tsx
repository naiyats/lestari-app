import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lestari - Portal Inklusif',
  description: 'A comprehensive platform designed to support individuals in finding employment, learning new skills, and maintaining mental wellness through accessible technology.',
  keywords: 'accessibility, jobs, mental health, speech to text, workshops',
  authors: [{ name: 'Lestari Team' }],
  creator: 'Lestari',
  publisher: 'Lestari',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://Lestari.app',
    title: 'Lestari - Portal Inklusif',
    description: 'A comprehensive platform designed to support individuals in finding employment, learning new skills, and maintaining mental wellness through accessible technology.',
    siteName: 'Lestari',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lestari - Portal Inklusif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lestari - Portal Inklusif',
    description: 'A comprehensive platform designed to support individuals in finding employment, learning new skills, and maintaining mental wellness through accessible technology.',
    images: ['/og-image.jpg'],
    creator: '@Lestariapp',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#6366f1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="application-name" content="Lestari" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lestari" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Lestari',
              description: 'A comprehensive platform designed to support individuals in finding employment, learning new skills, and maintaining mental wellness through accessible technology.',
              url: 'https://Lestari.app',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web',
              accessibilityFeature: ['visualContent', 'textAlternatives', 'closedCaptions'],
              accessibilityHazard: 'none',
              accessibilityControl: ['fullKeyboardControl', 'mouseControl', 'touchControl'],
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              author: { '@type': 'Organization', name: 'Lestari Team' }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50 rounded-br-lg transition-all duration-200"
        >
          Skip to main content
        </a>

        {/* Main content wrapper */}
        <div id="main-content" role="main" className="min-h-[100dvh]">
          {children}
        </div>

        {/* Accessibility announcement region */}
        <div
          id="announcements"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        ></div>

        {/* Loading indicator */}
        <div
          id="loading-indicator"
          className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 z-50"
          style={{ transformOrigin: 'left' }}
        ></div>

        {/* Accessibility helper script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                  document.body.classList.add('keyboard-nav');
                }
              });

              document.addEventListener('mousedown', function() {
                document.body.classList.remove('keyboard-nav');
              });

              function announcePageChange(message) {
                const announcer = document.getElementById('announcements');
                if (announcer) {
                  announcer.textContent = message;
                  setTimeout(() => {
                    announcer.textContent = '';
                  }, 1000);
                }
              }

              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
              }

              if (window.matchMedia('(prefers-contrast: high)').matches) {
                document.body.classList.add('high-contrast');
              }

              function adjustFontSize(increment) {
                const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                const newSize = Math.max(12, Math.min(24, currentSize + increment));
                document.documentElement.style.fontSize = newSize + 'px';
                localStorage.setItem('fontSize', newSize);
              }

              const savedFontSize = localStorage.getItem('fontSize');
              if (savedFontSize) {
                document.documentElement.style.fontSize = savedFontSize + 'px';
              }

              window.addEventListener('error', function(e) {
                console.error('Application error:', e.error);
              });

              window.addEventListener('online', function() {
                announcePageChange('Connection restored');
              });

              window.addEventListener('offline', function() {
                announcePageChange('Connection lost. Some features may be limited.');
              });
            `
          }}
        />
      </body>
    </html>
  )
}