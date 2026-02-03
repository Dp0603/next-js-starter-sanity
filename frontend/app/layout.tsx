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

// --- Metadata Configuration (Updated with Cache Busting) ---
export const metadata: Metadata = {
  title: "Akaame Exports Pvt. Ltd.",
  description: "Premium Footwear & Leather Goods Manufacturer",
  icons: {
    icon: [
      { url: './images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: './images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: './images/favicon.ico', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: './images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: './images/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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