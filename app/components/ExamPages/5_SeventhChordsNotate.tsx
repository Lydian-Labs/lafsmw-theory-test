"use client";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import seventhChordsText from "@/app/lib/data/seventhChordsText";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useState } from "react";
import CardFooter from "../CardFooter";
import NotateScale from "../NotateScale";

export default function NotateSeventhChords({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  updateAnswers,
}: UserDataProps) {
  const [seventhChordNotation, setseventhChordNotation] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const renderChordNames = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return seventhChordsText.slice(start, end).map((chord) => (
      <Box key={chord}>
        <Typography>{chord}</Typography>
      </Box>
    ));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...currentUserData,
      seventhChordNotation: seventhChordNotation,
    };
    setCurrentUserData(payload);
    updateAnswers();
    nextViewState();
  };

  return (
    <Container>
      <Box
        component="main"
        width={1139}
        height={700}
        bgcolor={"secondary.main"}
        borderRadius="var(--borderRadius)"
        p={2}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      >
        <Stack gap={2}>
          <Typography variant="h6" marginLeft={8}>
            Section 5: Notate 7th chords
          </Typography>
          <Box
            width={1000}
            height={590}
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
                  Notate the following 7th chords:
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" gap={8}>
                  {renderChordNames(0, 7)}
                </Stack>
              </Grid>
              <Grid item>
                <NotateScale />
              </Grid>
            </Grid>
            <CardFooter
              pageNumber={13}
              width={900}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
