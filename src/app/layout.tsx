import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Home, Settings, User2 } from "lucide-react";

const rubik = Vazirmatn({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "فود پارتی",
  description: "فود پارتی",
  manifest: "/manifest.json",
  openGraph: {
    title: "فود پارتی",
    description: "فود پارتی تیم توسعه فناوری وثوق من",
    images: [
      {
        url: "/icon/icon-512x512.png",
        width: 1200,
        height: 630,
        alt: "فود پارتی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فود پارتی",
    description: "فود پارتی تیم توسعه فناوری وثوق من",
    images: ["/icon/icon-512x512.png"],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${rubik.variable}  antialiased  w-screen h-screen flex justify-center items-start  `}
      >
        <Toaster position="top-center" richColors />
        {children}
   

      </body>
    </html>
  );
}
