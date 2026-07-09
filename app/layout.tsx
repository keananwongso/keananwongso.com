import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Bloom from "@/components/Bloom";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: "400",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
      className={`${fraunces.variable} ${ibmPlexMono.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Bloom />
        <Nav />
        {children}
      </body>
    </html>
  );
}
