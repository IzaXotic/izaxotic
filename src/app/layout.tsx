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

export const metadata: Metadata = {
  title: "IzaXotic — Premium Web Development & UI/UX Design",
  description:
    "IzaXotic crafts high-end, immersive digital experiences that feel alive. Premium web development and UI/UX design studio.",
  keywords: ["web development", "UI/UX design", "Next.js", "React", "Three.js"],
  openGraph: {
    title: "IzaXotic — Digital Experiences That Feel Alive",
    description: "Premium Web Development & UI/UX Design Agency",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
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
