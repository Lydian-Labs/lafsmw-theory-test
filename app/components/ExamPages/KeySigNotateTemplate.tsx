"use client";
import { keySigNotationInstructions } from "@/app/lib/data/instructions";
import keySignaturesText from "@/app/lib/data/keySignaturesText";
import { MouseEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import CardFooter from "../CardFooter";
import NotateKeySignature from "../NotateKeySignature";
import TutorialCard from "../TutorialCard";
import TutorialModal from "../TutorialModal";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";

export default function KeySignaturesNotation({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const [keySignatureNotation, setKeySignatureNotation] = useState([]);

  const keySigPropName = `keySignaturesNotation${page}`;

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setCurrentUserData({
      ...currentUserData,
      [keySigPropName]: keySignatureNotation,
    });
    nextViewState();
  };

  function handleKeySigNotation(input: any) {
    setKeySignatureNotation(input);
  }

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Container>
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 1: Notate Key Signatures
        </Typography>
        <TutorialModal tutorialInstructions={keySigNotationInstructions} />
      </Box>
      <Box
        component="main"
        width={1139}
        height={610}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={750}
              height={540}
              bgcolor={"card.background"}
              borderRadius="var(--borderRadius)"
              margin={"auto"}
              boxShadow="var(--cardShadow)"
            >
              <Grid
                container
                columns={1}
                direction="column"
                alignItems={"center"}
                marginY={"auto"}
                p={4}
                spacing={2}
              >
                <Grid item>
                  <Typography variant="h6">
                    {`Notate the following key signature: ${
                      keySignaturesText[page - 1]
                    }`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateKeySignature handleNotes={handleKeySigNotation} />
                </Grid>
              </Grid>
              <CardFooter pageNumber={page} handleSubmit={handleSubmit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
