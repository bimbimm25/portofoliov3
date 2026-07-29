import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Fullstack Developer",
  description: "Portfolio website created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white text-gray-900 antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <SmoothScroll>
            <div className="flex-1">
              {children}
            </div>  
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}