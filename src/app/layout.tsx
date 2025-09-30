'use client';

import type { Metadata } from "next";
import "./globals.css";
import BaseLayout from "@/components/layout/BaseLayout";


import { Poppins } from "next/font/google";
import { ServerTranslationProvider } from "@/hooks/ServerTranslationProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

 const metadata: Metadata = {
  title: "Climate Change Action Portal",
  description:
    "Climate Change Action Portal for Cameroon - Track climate projects, funding sources, and actors making a difference in environmental conservation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {" "}
        <ServerTranslationProvider>
          <BaseLayout>{children}</BaseLayout>
        </ServerTranslationProvider>
      </body>
    </html>
  );
}
