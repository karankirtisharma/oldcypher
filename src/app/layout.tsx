import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import dynamic from "next/dynamic";

const FloatingDock = dynamic(() => import("@/components/ui/FloatingDock"), { ssr: false });
const MeshGradient = dynamic(() => import("@/components/hero/MeshGradient"), { ssr: false });
const StarField = dynamic(() => import("@/components/hero/StarField"), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cyphernaut - Web3 Ecosystems",
  description: "Architects of the Decentralized Frontier",
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
        <StarField />
        <MeshGradient />
        <FloatingDock />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
