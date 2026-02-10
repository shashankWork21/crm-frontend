import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/general/footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Smart CRM",
  description:
    "The Smart CRM is a powerful tool for managing customer relationships, streamlining communication, and enhancing productivity. It offers features like contact management, activity tracking, and intelligent insights to help businesses build stronger relationships with their customers.",
  openGraph: {
    title: "Smart CRM",
    description:
      "The Smart CRM is a powerful tool for managing customer relationships, streamlining communication, and enhancing productivity.",
    images: ["/logo-1024.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased overscroll-none bg-rich-black font-sans text-slate-100`}
      >
        <Providers>
          <div className="min-h-screen">{children}</div>
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
