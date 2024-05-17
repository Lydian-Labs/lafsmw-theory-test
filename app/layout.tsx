import AuthContextProvider from "@/firebase/authContext";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import { TimerProvider } from "./context/TimerContext";
import "./styles/globals.css";
import theme from "./theme";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

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
      <body className={poppins.className}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <TimerProvider>
              <Navbar />
              {children}
            </TimerProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
