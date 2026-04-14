import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import LenisProvider from "@/components/ui/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://izaxotic-prototype.netlify.app";

export const metadata: Metadata = {
  title: "IzaXotic — Premium Custom Web Development & UI/UX Design Studio",
  description:
    "IzaXotic crafts high-end, immersive digital experiences that feel alive. 100% custom-coded web development and UI/UX design studio — no templates, no drag-and-drop.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: [
    "web development",
    "UI/UX design",
    "custom web development",
    "Next.js",
    "React",
    "Three.js",
    "web design agency",
    "premium web development India",
    "custom coded websites",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: siteUrl + "/" },
  openGraph: {
    title: "IzaXotic — Your Vision, Engineered Into Reality",
    description:
      "Premium custom web development & UI/UX design agency. 100% hand-coded, zero templates.",
    type: "website",
    url: siteUrl,
    siteName: "IzaXotic",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IzaXotic — Premium Custom Web Development & UI/UX Design Studio",
    description:
      "We craft high-end, immersive digital experiences. 100% custom-coded — no templates, no drag-and-drop.",
  },
  robots: { index: true, follow: true },
};

/* JSON-LD structured data */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IzaXotic",
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  description:
    "Premium custom web development & UI/UX design studio crafting immersive digital experiences.",
  foundingDate: "2022",
  founder: {
    "@type": "Person",
    name: "Prem IzaX",
    jobTitle: "CEO & Founder",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@izaxotic.com",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.instagram.com/izaxotic",
    "https://www.linkedin.com/company/izaxotic",
    "https://x.com/izaxotic",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "IzaXotic",
  url: siteUrl,
  description:
    "Premium custom web development & UI/UX design studio.",
  priceRange: "₹₹",
  email: "hello@izaxotic.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Remote-First",
    addressCountry: "IN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#0B0B0F] text-gray-100 antialiased">
        <LenisProvider>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
