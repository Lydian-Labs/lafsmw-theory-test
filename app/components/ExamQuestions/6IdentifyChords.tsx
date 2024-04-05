"use client";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import seventhChords from "../../lib/data/seventhChords";
import CardFooter from "../CardFooter";
import IdentifyChords from "../IdentifyChords";

export default function IdentifyChordsPage({
  currentUserData,
  setCurrentUserData,
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
        <Stack gap={2} alignItems={"center"}>
          <Typography variant="h5">Section 3: Identify Chords</Typography>
          <Box
            width={1000}
            height={500}
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
                <IdentifyChords
                  chords={seventhChords}
                  numBars={7}
                  handleChords={handleChords}
                  ref={chordsFormRef}
                  width={800}
                />
              </Grid>
            </Grid>
            <CardFooter
              width={900}
              height={200}
              questionNumber={6}
              handleSubmit={() => {
                chordsFormRef.current?.requestSubmit();
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
