"use client";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import triadsText from "@/app/lib/data/triadsText";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useState } from "react";
import CardFooter from "../CardFooter";
import NotateChord from "../NotateChord";

export default function TriadsNotation({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const [triadNotation, setTriadNotation] = useState({
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
    return triadsText.slice(start, end).map((chord) => (
      <Box key={chord}>
        <Typography>{chord}</Typography>
      </Box>
    ));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...currentUserData,
      triadNotation: triadNotation,
    };
    setCurrentUserData(payload);
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
            Section 4: Notate Triads
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
                  Notate the following triads:
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" gap={8}>
                  {renderChordNames(0, 6)}
                </Stack>
              </Grid>
              <Grid item>
                <NotateChord />
              </Grid>
            </Grid>
            <CardFooter
              pageNumber={12}
              width={900}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
