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
  const logoSettings = settings?.logo || undefined;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} ${oswald.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans bg-white text-[#14253f] min-h-screen flex flex-col">

        {/* UPDATED: Header now receives both the menu array 
          and the logo object fetched from SETTINGS_QUERY 
        */}
        <Header
          menuItems={menuItems}
          logo={logoSettings}
        />

        {/* MAIN CONTENT AREA 
          'flex-grow' ensures that the footer is pushed to the bottom 
          of the screen even on pages with very little content.
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER
          Passes the full settings object for dynamic contact info,
          social links, and legal text.
        */}
        <Footer settings={settings} />

        {/* SANITY LIVE
          Enables real-time visual editing and content updates
          without requiring a manual browser refresh.
        */}
        <SanityLive />

      </body>
    </html>
  );
}