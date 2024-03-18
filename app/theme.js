"use client";
import { createTheme } from "@mui/material";
import Poppins from "@fontsource/poppins";
import tokens from "./tokens.json";
import Montserrat from "typeface-montserrat";

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.global.md.sys.color["enabled-button-color"].value,
    },
    secondary: {
      main: tokens.global.md.sys.color["pressed-button-color"].value,
    },
    background: {
      main: tokens.global.md.sys.color["main-background-color"].value,
      card: tokens.global.md.sys.color["card-background-color"].value,
    },
    button: {
      pressed: tokens.global.md.sys.color["pressed-button-color"].value,
      enabled: tokens.global.md.sys.color["enabled-button-color"].value,
    },
    card: {
      background: "#FAF5F3",
      shadow:
        "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
    },
    progressBar: {
      filled: tokens.global.md.sys.color["filled-progress-bar-color"].value,
      unfilled: tokens.global.md.sys.color["unfilled-progress-bar-color"].value,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.global.md.sys["border-radius"].value}px`,
          backgroundColor:
            tokens.global.md.sys.color["pressed-button-color"].value,
          color: "black",
          boxShadow:
            "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
          fontFamily:
            tokens.global.md.sys.typescale["button-text"].value.fontFamily,
          fontWeight: 500,
          fontSize: "12px",
          "&:hover": {
            backgroundColor:
              tokens.global.md.sys.color["enabled-button-color"].value,
          },
        },
      },
    },
  },
});

export default theme;
