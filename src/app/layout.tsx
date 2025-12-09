import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";

const encodeSans = Encode_Sans({
  subsets: ["latin"],
  variable: "--font-encode-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Transfer Evaluation | UW",
  description: "Intelligent transfer credit evaluation for University of Washington",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${encodeSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
