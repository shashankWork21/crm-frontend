import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/general/header";
import { Analytics } from "@vercel/analytics/next";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "300", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Smart CRM",
  description:
    "The Smart CRM is a powerful tool for managing customer relationships, streamlining communication, and enhancing productivity. It offers features like contact management, activity tracking, and intelligent insights to help businesses build stronger relationships with their customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} antialiased bg-slate-100`}>
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
