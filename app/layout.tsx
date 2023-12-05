import type { Metadata } from "next";
import Navbar from "./components/Navbar";

import { Inter, Montserrat } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "LAFSMW Theory Test",
  description: "Authored by Kasey Knudsen and Brett Eastman",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
