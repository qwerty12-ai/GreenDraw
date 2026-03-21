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

export const metadata = {
  title: "GreenDraw — Play, Win & Give Back",
  description:
    "A subscription-based platform where users enter their scores, participate in monthly draws, win rewards, and support charities with every play.",
  keywords: [
    "lottery app",
    "charity platform",
    "subscription app",
    "draw system",
    "gaming with charity",
    "nextjs fullstack app",
  ],
  authors: [{ name: "Sabeeh" }],
  openGraph: {
    title: "GreenDraw — Win While Giving Back",
    description:
      "Track your scores, join monthly draws, win prizes, and support meaningful causes.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
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
