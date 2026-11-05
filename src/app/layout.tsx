import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteDetails } from "@/data/siteDetails";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteDetails.siteUrl),
  title: siteDetails.metadata.title,
  description: siteDetails.metadata.description,
  openGraph: {
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    url: siteDetails.siteUrl,
    type: "website",
    siteName: siteDetails.siteName,
    images: [
      {
        url: "/images/art of home.png",
        width: 1200,
        height: 675,
        alt: siteDetails.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteDetails.metadata.title,
    description: siteDetails.metadata.description,
    images: ["/images/art of home.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ArtGallery",
  name: "Art of Home",
  url: "https://artofhome.pk",
  logo: "https://artofhome.pk/images/art%20of%20home.png",
  image: "https://artofhome.pk/images/art%20of%20home.png",
  description: siteDetails.metadata.description,
  telephone: "+923378639893",
  priceRange: "PKR 2,500 - PKR 47,000",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PK",
  },
  founder: {
    "@type": "Person",
    name: "Ayesha Chaudhary",
  },
  sameAs: [
    "https://www.facebook.com/share/1BnNdaNTTq/?mibextid=wwXIfr",
    "https://www.instagram.com/artofhome.pk",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} font-sans bg-warm-cream text-foreground min-h-screen antialiased selection:bg-burgundy/10 selection:text-burgundy`}>
        <Header />
        {children}
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
