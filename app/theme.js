"use client";
import { createTheme } from "@mui/material";
import Poppins from "@fontsource/poppins";
import tokens from "./tokens.json";

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
  // typography: {
  //   fontFamily: "Poppins",
  //   sectionTitle: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["section-title"].value.fontFamily,
  //     fontWeight: 500,
  //     fontSize: `${tokens.global.md.sys.typescale["section-title"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["section-title"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["section-title"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["section-title"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["section-title"].value.paragraphSpacing}px`,
  //   },
  //   pageTitle: {
  //     fontFamily: tokens.global.md.sys.typescale["page-title"].value.fontFamily,
  //     fontWeight: 500,
  //     fontSize: `${tokens.global.md.sys.typescale["page-title"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["page-title"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["page-title"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["page-title"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["page-title"].value.paragraphSpacing}px`,
  //   },
  //   progressBarText: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["progress-bar-text"].value.fontFamily,
  //     fontWeight: 600,
  //     fontSize: `${tokens.global.md.sys.typescale["progress-bar-text"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["progress-bar-text"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["progress-bar-text"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["progress-bar-text"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["progress-bar-text"].value.paragraphSpacing}px`,
  //   },
  //   userInstructions: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["user-instructions"].value.fontFamily,
  //     fontWeight: 400,
  //     fontSize: `${tokens.global.md.sys.typescale["user-instructions"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["user-instructions"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["user-instructions"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["user-instructions"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["user-instructions"].value.paragraphSpacing}px`,
  //   },
  //   userInstructionTitles: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["user-instruction-titles"].value
  //         .fontFamily,
  //     fontWeight: 600,
  //     fontSize: `${tokens.global.md.sys.typescale["user-instruction-titles"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["user-instruction-titles"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["user-instruction-titles"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["user-instruction-titles"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["user-instruction-titles"].value.paragraphSpacing}px`,
  //   },
  //   buttonText: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["button-text"].value.fontFamily,
  //     fontWeight: 500,
  //     fontSize: `${tokens.global.md.sys.typescale["button-text"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["button-text"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["button-text"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["button-text"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["button-text"].value.paragraphSpacing}px`,
  //   },
  //   tutorialTitle: {
  //     fontFamily:
  //       tokens.global.md.sys.typescale["tutorial-title"].value.fontFamily,
  //     fontWeight: 500,
  //     fontSize: `${tokens.global.md.sys.typescale["tutorial-title"].value.fontSize}px`,
  //     lineHeight:
  //       `${tokens.global.md.sys.typescale["tutorial-title"].value.lineHeight}px` ===
  //       "auto"
  //         ? "auto"
  //         : `${tokens.global.md.sys.typescale["tutorial-title"].value.lineHeight}px`,
  //     letterSpacing: `${tokens.global.md.sys.typescale["tutorial-title"].value.letterSpacing}px`,
  //     paragraphSpacing: `${tokens.global.md.sys.typescale["tutorial-title"].value.paragraphSpacing}px`,
  //   },
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@font-face": [Poppins],
        },
      },
    },
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
