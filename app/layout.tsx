import AuthContextProvider from "@/firebase/authContext";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import "./styles/globals.css";
import theme from "./theme";

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
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
