import "@/styles/globals.css";
import '@mantine/core/styles.css';
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
// Supports weights 400-800
import '@fontsource-variable/syne';
import { TRPCReactProvider } from "@/trpc/react";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Mugimu Health Care",
  description: "Mugimu Health Care",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="">
        <TRPCReactProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
