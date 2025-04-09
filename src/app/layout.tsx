import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Montserrat-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "VaultKey",
  description: "VaultKey Password Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} antialiased`}>
          <Providers>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
