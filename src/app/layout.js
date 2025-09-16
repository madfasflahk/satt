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
  title: "Lottery king",
  description:"Lottery king game is a popular gambling game, that originated in India. Here are some important aspects of this game"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-zinc-200 bgImage`}
        suppressHydrationWarning
      >
        {/* {children} */}
      </body>
    </html>
  );
}