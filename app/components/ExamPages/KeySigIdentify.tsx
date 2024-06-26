"use client";
import { keySigInputInstructions } from "@/app/lib/data/instructions";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import CardFooter from "../CardFooter";
import IdentifyKeySigs from "../IdentifyKeySigs";
import TutorialModal from "../TutorialModal";

export default function KeySignaturesIdentification({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const keySigFormRef = useRef<HTMLFormElement | null>(null);

  function handleKeySignatures(input: InputData) {
    setCurrentUserData({ ...currentUserData, keySignatures: input });
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
          Section 2: Identify Key Signatures
        </Typography>
        <TutorialModal tutorialInstructions={keySigInputInstructions} />
      </Box>
      <Box
        component="main"
        width={1139}
        height={550}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={569}
              height={480}
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
                    Identify the following key signatures:
                  </Typography>
                </Grid>
                <Grid item>
                  <IdentifyKeySigs
                    currentData={currentUserData.keySignatures}
                    evenbars
                    handleInput={handleKeySignatures}
                    ref={keySigFormRef}
                    width={520}
                  />
                </Grid>
              </Grid>
              <CardFooter
                pageNumber={page}
                height={200}
                buttonForm="keySigs"
                handleSubmit={() => {
                  keySigFormRef.current?.requestSubmit();
                  nextViewState();
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
