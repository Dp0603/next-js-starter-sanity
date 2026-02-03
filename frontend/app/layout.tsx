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

// --- Metadata Configuration ---
export const metadata: Metadata = {
  title: "Akaame Exports Pvt. Ltd.",
  description: "Premium Footwear & Leather Goods Manufacturer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Fetching site settings with Sanity Live support
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  // Fallbacks for data to prevent runtime errors
  const menuItems = settings?.headerMenu || [];

  // FIX: Type casting to 'any' resolves the 'null' is not assignable to 'undefined' error
  // identified in the Vercel build logs
  const logoSettings = settings?.logo as any;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${oswald.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased font-sans bg-white text-[#14253f] min-h-screen flex flex-col">

        {/* Header receives the casted logoSettings to satisfy TypeScript */}
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