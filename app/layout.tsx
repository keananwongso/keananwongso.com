import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Hanken_Grotesk } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Bloom from "@/components/Bloom";
import "./globals.css";

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["500"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Keanan Wongso",
    template: "%s — Keanan Wongso",
  },
  description:
    "Sophomore at UBC studying computer science. Vancouver × Jakarta.",
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${shippori.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Bloom />
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
