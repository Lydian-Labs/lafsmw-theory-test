"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import ProgressBar from "@/app/components/ProgressBar";
import { notationInstructions } from "@/app/lib/instructions";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useRef, useState } from "react";
import seventhChords from "../../lib/data/seventhChords";
import IdentifyChords from "../IdentifyChords";
import CardFooter from "../CardFooter";

export default function IdentifyChordsPage({
  currentUserData,
  setCurrentUserData,
}: UserDataProps) {
  const [chords, setChords] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
    input7: "",
    input8: "",
  });

  const chordsFormRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...currentUserData,
      chords: chords,
    };
    setCurrentUserData(payload);
  };

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
                  handleChords={handleSubmit}
                  ref={chordsFormRef}
                  width={800}
                />
              </Grid>
            </Grid>
            <CardFooter width={900} height={200} questionNumber={6} />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
