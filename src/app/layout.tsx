import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Domain atau URL websitemu (ganti dengan domain asli kamu jika sudah dipublish/deploy)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bimaardiansyah.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bima Ardiansyah | Fullstack Web Developer",
    template: "%s | Bima Ardiansyah",
  },
  description:
    "Portfolio resmi Bima Ardiansyah, seorang Fullstack Web Developer berpengalaman dalam membangun aplikasi web modern, responsif, dan performa tinggi menggunakan Next.js, React, Laravel, dan Tailwind CSS.",
  keywords: [
    "Bima Ardiansyah",
    "Bima Ardiansyah Portfolio",
    "Fullstack Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer Indonesia",
    "React Developer Sidoarjo",
    "Web Developer Sidoarjo",
    "Web Developer Jawa Timur",
    "Jasa Pembuatan Website",
    "Jasa pembuatan website sidoarjo"
  ],
  authors: [{ name: "Bima Ardiansyah", url: siteUrl }],
  creator: "Bima Ardiansyah",
  publisher: "Bima Ardiansyah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Open Graph untuk preview tampilan menarik di WhatsApp, LinkedIn, Facebook
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    title: "Bima Ardiansyah | Fullstack Web Developer Portfolio",
    description:
      "Jelajahi proyek web modern, keahlian teknis, dan pengalaman Bima Ardiansyah sebagai Fullstack Web Developer.",
    siteName: "Bima Ardiansyah",
    images: [
      {
        url: "/og-image.png", // Buat file gambarmu di public/og-image.png (1200x630 px)
        width: 1200,
        height: 630,
        alt: "Bima Ardiansyah - Fullstack Web Developer",
      },
    ],
  },
  // Twitter Card untuk preview di Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Bima Ardiansyah | Fullstack Web Developer",
    description:
      "Portfolio resmi Bima Ardiansyah - Fullstack Web Developer spesialis Next.js, React, dan Laravel.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema Structured Data (Person JSON-LD) untuk memberi tahu Google siapa Bima Ardiansyah
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bima Ardiansyah",
    url: siteUrl,
    jobTitle: "Fullstack Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "PT. Evotek",
    },
    sameAs: [
      "https://github.com/bimbimm25",
      "https://www.linkedin.com/in/bima-ardiansyah-062016353/",
      "https://www.instagram.com/bimm.zhr",
    ],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "Laravel",
      "Tailwind CSS",
      "Fullstack Development",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sidoarjo",
      addressRegion: "Jawa Timur",
      addressCountry: "Indonesia",
    },
  };

  return (
    <html lang="id">
      <head>
        {/* Injeksi Structured Data Google Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased flex flex-col min-h-screen`}>
        <LanguageProvider>
          <SmoothScroll>
            <div className="flex-1">{children}</div>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}