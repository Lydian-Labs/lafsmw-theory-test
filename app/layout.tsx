import AuthContextProvider from "@/firebase/authContext";
import ExamContextProvider from "./context/examContext";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import "./styles/globals.css";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthContextProvider>
          <ExamContextProvider>
            <ThemeProvider theme={theme}>
              <Navbar />
              {children}
            </ThemeProvider>
          </ExamContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
