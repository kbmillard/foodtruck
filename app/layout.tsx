import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  LOCAL_BUSINESS_SCHEMA,
  SITE_NAME,
} from "@/lib/seo";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foodtruck.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      {
        url: "/icons/la-hamburguesa-loca-logo-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/la-hamburguesa-loca-logo-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/icons/la-hamburguesa-loca-logo-180x180.png",
  },
  manifest: "/icons/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const schema = {
    ...LOCAL_BUSINESS_SCHEMA,
    image: `${siteUrl}/icons/la-hamburguesa-loca-logo-1024x1024.png`,
  };

  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
