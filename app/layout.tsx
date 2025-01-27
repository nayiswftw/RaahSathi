
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ReactLenis from 'lenis/react';

export const metadata: Metadata = {
  title: "RaahSathi",
  description: "RaahSathi - Your Personal Travel Assistant",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className="antialiased" >
            <ReactLenis root>
              {children }
            </ReactLenis>
        </body>
      </html>
    </ClerkProvider>
  );
}
