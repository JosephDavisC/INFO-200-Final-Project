import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout";

const encodeSans = Encode_Sans({
  subsets: ["latin"],
  variable: "--font-encode-sans",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://info200.joechamdani.cloud"),
  title: {
    default: "UW INFO 200 Transfer Evaluation Tool",
    template: "%s | UW INFO 200 Transfer Evaluation Tool",
  },
  description: "INFO 200 Final Project demonstrating an interactive UW transfer evaluation tool.",
  keywords: [
    "UW transfer",
    "University of Washington",
    "transfer evaluation",
    "INFO 200",
    "course transfer",
    "academic transfer",
    "credit evaluation",
  ],
  authors: [{ name: "John Doe" }],
  creator: "John Doe",
  publisher: "University of Washington",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://info200.joechamdani.cloud",
    siteName: "UW INFO 200 Transfer Evaluation Tool",
    title: "UW INFO 200 Transfer Evaluation Tool",
    description: "INFO 200 Final Project demonstrating an interactive UW transfer evaluation tool.",
    images: [
      {
        url: "/UW_Transfer_Evaluation_Tool.jpg",
        width: 1200,
        height: 630,
        alt: "UW INFO 200 Transfer Evaluation Tool",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UW INFO 200 Transfer Evaluation Tool",
    description: "INFO 200 Final Project demonstrating an interactive UW transfer evaluation tool.",
    images: ["/UW_Transfer_Evaluation_Tool.jpg"],
    creator: "@johndoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/uw-logo.png",
    shortcut: "/uw-logo.png",
    apple: "/uw-logo.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://info200.joechamdani.cloud",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${encodeSans.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
