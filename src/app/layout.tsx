import type { Metadata } from "next";
import { Outfit, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/general/footer";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const sora = Sora({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased overscroll-none bg-white`}
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
