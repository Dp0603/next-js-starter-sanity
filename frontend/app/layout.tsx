import type { Metadata } from "next";
import "./globals.css";

import { Inter, IBM_Plex_Mono, Oswald } from 'next/font/google';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { SETTINGS_QUERY } from "@/sanity/lib/queries";

import { SanityLive, sanityFetch } from "@/sanity/lib/live";

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

export const metadata: Metadata = {
  title: "Akaame Exports Pvt. Ltd.",
  description: "Premium Footwear & Leather Goods Manufacturer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // 👇 FIXED: Use sanityFetch instead of client.fetch
  // This enables "Live Mode" so you don't have to restart the server
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  // Fallback for Menu Items
  const menuItems = settings?.headerMenu || [];

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} ${oswald.variable}`}>
      <body className="antialiased font-sans bg-white text-[#14253f]">

        {/* Pass Dynamic Menu to Header */}
        <Header menuItems={menuItems} />

        {/* Main Content Area */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Pass Dynamic Settings to Footer */}
        <Footer settings={settings} />

        {/* Enable Real-time Preview */}
        <SanityLive />

      </body>
    </html>
  );
}