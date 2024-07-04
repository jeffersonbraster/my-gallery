import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jefferson Brandão - Galeria",
  description: "Minha galeria de fotos ",
  authors: [
    {
      name: "Jefferson Brandão",
      url: new URL("https://galeria.jeffersonbrandao.com.br"),
    },
  ],
  creator: "Jefferson Brandão",

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },

  // OpenGraph metadata
  openGraph: {
    title: "Jefferson Brandão - Galeria",
    description: "Minha galeria de fotos ",
    url: new URL("https://galeria.jeffersonbrandao.com.br"),
    siteName: "Jefferson Brandão - Galeria",
    images: [
      {
        url: new URL("https://galeria.jeffersonbrandao.com.br"),
        width: 1800,
        height: 1000,
        alt: "Jefferson Brandão - Galeria",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },

  twitter: {
    card: "summary_large_image",
    site: "https://galeria.jeffersonbrandao.com.br",
    title: "Jefferson Brandão - Galeria",
    description: "Minha galeria de fotos ",
    images: {
      url: new URL("https://galeria.jeffersonbrandao.com.br/og.png"),
      width: 1800,
      height: 1000,
      alt: "Jefferson Brandão - Galeria",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-main antialiased`}>{children}</body>
    </html>
  );
}
