"use client";
import { createTheme } from "@mui/material/styles";
// import { createMuiTheme } from "@material-ui/core/styles";

// import Montserrat from "typeface-montserrat";

// const theme = createTheme({
//   typography: {
//     fontFamily: "Montserrat, sans-serif",
//   },
// });

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d0e0b", // --primary10
      dark: "#2b2b2b", // --primary20
      light: "#ffffff", // --primary100
    },
    secondary: {
      main: "#f6d168", // --sdGlobalMdSysColorEnabledButtonColor
    },
    background: {
      default: "#6b8287", // --sdGlobalMdSysColorMainBackgroundColor
      card: "#f6f6f6", // --sdGlobalMdSysColorCardBackgroundColor
    },
  },
  typography: {
    fontFamily: "Poppins",
    sectionTitle: {
      fontWeight: 500,
      fontSize: "25px",
    },
    pageTitle: {
      fontWeight: 500,
      fontSize: "20px",
    },
    progressBarText: {
      fontWeight: "600", // 'semi-bold' corresponds to 600 in Material UI
      fontSize: "14px",
    },
    userInstructions: {
      fontWeight: 400,
      fontSize: "11px",
    },
    userInstructionTitles: {
      fontWeight: "600", // 'semi-bold' corresponds to 600 in Material UI
      fontSize: "11px",
    },
    buttonText: {
      fontWeight: 500,
      fontSize: "16px",
    },
    tutorialTitle: {
      fontWeight: 500,
      fontSize: "18px",
    },
  },
  shadows: [
    "none", // 0
    "0 783px 219px 0 rgba(0, 0, 0, 1)", // --sdGlobalMdSysShadowGreyBackgroundDropShadow1
    "0 501px 200px 0 rgba(0, 0, 0, 0.01)", // --sdGlobalMdSysShadowGreyBackgroundDropShadow2
    "0 282px 169px 0 rgba(0, 0, 0, 0.05)", // --sdGlobalMdSysShadowGreyBackgroundDropShadow3
    "0 125px 125px 0 rgba(0, 0, 0, 0.09)", // --sdGlobalMdSysShadowGreyBackgroundDropShadow4
    "0 31px 69px 0 rgba(0, 0, 0, 0.1)", // --sdGlobalMdSysShadowGreyBackgroundDropShadow5
  ],
  shape: {
    borderRadius: "12px", // --sdGlobalMdSysBorderRadius
  },
  spacing: {
    buttonSizing: "40px", // --sdGlobalMdSysSizingButtonSizing
    mainCardSize: "569px", // --sdGlobalMdSysSizingMainCardSize
    tutorialCardSize: "273px", // --sdGlobalMdSysSizingTutorialCardSize
    greyBackgroundSize: "1139px", // --sdGlobalMdSysSizingGreyBackgroundSize
    nextQuestionButtonSizing: "40px", // --sdGlobalMdSysSizingNextQuestionButtonSizing
    progressBarSize: "13px", // --sdGlobalMdSysSizingProgressBarSize
  },
  // Define custom spacing here
});

export default theme;
