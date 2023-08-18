import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./header";
import { WagmiConfig } from "wagmi";
import config from "./lib/WagmiConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KAKUSHIKA",
  description: "Output To Earn Project.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <WagmiConfig config={config}>
          <Header />
          {children}
        </WagmiConfig>
      </body>
    </html>
  );
}
