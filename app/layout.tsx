import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "50 Years of Joy | Joy Mendez's Birthday Wall",
  description: "Celebrating Joy Mendez's 50th birthday! Share your favorite memories, photos, and messages on this special digital wall. From India to France, from padel to salsa - let's fill this with 50 years worth of joyful moments! 🎉💙",
  keywords: "birthday, celebration, Joy Mendez, 50th birthday, memory wall, family, friends",
  authors: [{ name: "Joy's Family" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "50 Years of Joy | Joy Mendez's Birthday Wall",
    description: "Celebrate Joy's 50th birthday! Share your memories, photos, and messages on this special wall. From his cooking to dance moves, let's make this milestone unforgettable! 🎉",
    type: "website",
    locale: "en_US",
    siteName: "50 Years of Joy",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "50 Years of Joy - Joy Mendez's Birthday Wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "50 Years of Joy | Joy Mendez's Birthday Wall",
    description: "Celebrating Joy's 50th! Share your memories and photos on this special birthday wall 🎉💙",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
