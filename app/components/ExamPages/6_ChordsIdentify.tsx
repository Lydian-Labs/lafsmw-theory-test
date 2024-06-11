"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import seventhChords from "../../lib/data/seventhChords";
import CardFooter from "../CardFooter";
import IdentifyNotation from "../IdentifyNotation";

export default function ChordsIdentification({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const chordsFormRef = useRef<HTMLFormElement | null>(null);

  function handleChords(input: InputData) {
    setCurrentUserData({ ...currentUserData, chords: input });
  }

  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={637}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Stack gap={2}>
          <Typography variant="h6" marginLeft={8} marginY={2}>
            Section 6: Identify Chords
          </Typography>
          <Box
            width={1000}
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
              pageNumber={19}
              handleSubmit={() => {
                chordsFormRef.current?.requestSubmit();
                nextViewState();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
