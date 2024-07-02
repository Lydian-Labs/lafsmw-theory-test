"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRef } from "react";
import seventhChords from "../../lib/data/seventhChords";
import CardFooter from "../CardFooter";
import IdentifyNotation from "../IdentifyNotation";

export default function ChordsIdentification({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const chordsFormRef = useRef<HTMLFormElement | null>(null);

  function handleChords(input: InputData) {
    setCurrentUserData({ ...currentUserData, chords: input });
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
          Section 6: Identify Chords
        </Typography>
      </Box>
      <Box
        component="main"
        width={1139}
        height={520}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={1000}
              height={450}
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
                    Identify the following 7th chords:
                  </Typography>
                </Grid>
                <Grid item>
                  <IdentifyNotation
                    chords={seventhChords}
                    currentData={currentUserData.chords}
                    numBars={7}
                    handleInput={handleChords}
                    ref={chordsFormRef}
                    width={950}
                  />
                </Grid>
              </Grid>
              <CardFooter
                width={900}
                height={200}
                pageNumber={page}
                handleSubmit={() => {
                  chordsFormRef.current?.requestSubmit();
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
