import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridlo Achmad Ghifary",
  description:
    "I'm Ridlo, a fullstack developer with a passion for building blazingly fast web applications. This is my portfolio, where I showcase my skills and projects I've worked on. I'm also a professional keyboard smasher.",
  keywords: [
    "portfolio",
    "fullstack",
    "web development",
    "ridlo",
    "achmad",
    "ghifary",
    "ridloghfry",
    "ridlo achmad ghifary",
    "ridlo portfolio",
    "ridlo achmad ghifary portfolio",
    "ridlo achmad ghifary web portfolio",
  ],
  authors: [{ name: "Ridlo Achmad Ghifary", url: "https://ridloghfry.web.id" }],
  openGraph: {
    title: "Ridlo Achmad Ghifary",
    description:
      "I'm Ridlo, a fullstack developer with a passion for building blazingly fast web applications. This is my portfolio, where I showcase my skills and projects I've worked on. I'm also a professional keyboard smasher.",
    type: "website",
    url: "https://ridloghfry.web.id",
    images: [
      {
        url: "https://fpw8ui6qzh.ufs.sh/f/yG9PaXbHEXJB1Q4LGJwoUz5WgRHAyiDLrfqtexOSmZ2wCs4X",
        width: 764,
        height: 764,
        alt: "Ridlo Achmad Ghifary's Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
