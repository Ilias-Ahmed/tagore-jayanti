import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rabindranath Tagore Jayanti – Poetry Competition | Modern Public Academy",
  description:
    "Celebrate the legacy of Rabindranath Tagore at Modern Public Academy Senior Secondary. Register for the Poetry Competition, and Decorative Writing event.",
  keywords: [
    "Rabindranath Tagore",
    "Tagore Jayanti",
    "Poetry Competition",
    "Modern Public Academy",
    "School Event",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
