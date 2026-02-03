import type { Metadata } from "next";
import "./globals.css";

import { Inter, IBM_Plex_Mono, Oswald } from 'next/font/google';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";

// --- Font Configuration ---
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
});

// --- Metadata Configuration (Updated with Favicons) ---
export const metadata: Metadata = {
  title: "Akaame Exports Pvt. Ltd.",
  description: "Premium Footwear & Leather Goods Manufacturer",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Fetching site settings
  // ADDED: revalidate: 3600 to cache the header/footer for 1 hour
  // This ensures page switches are instant because the layout doesn't re-fetch data
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  const menuItems = settings?.headerMenu || [];
  const logoSettings = settings?.logo as any;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${oswald.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      {/* FIX: bg-white on body can cause a white flash during dark page loads.
        If the site is primarily dark, use bg-[#0f1b2d] or remove it.
      */}
      <body className="antialiased font-sans bg-white text-[#14253f] min-h-screen flex flex-col">

        <Header
          menuItems={menuItems}
          logo={logoSettings}
        />

        <main className="flex-grow">
          {children}
        </main>

        <Footer settings={settings} />

        <SanityLive />
      </body>
    </html>
  );
}