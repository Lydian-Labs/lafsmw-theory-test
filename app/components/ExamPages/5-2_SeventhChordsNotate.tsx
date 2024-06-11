"use client";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import seventhChordsText from "@/app/lib/data/seventhChordsText";
import { notationInstructions } from "@/app/lib/instructions";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useEffect, useState } from "react";
import CardFooter from "../CardFooter";
import NotateChord from "../NotateChord";

export default function NotateSeventhChords2({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const [chords, setChords] = useState<string[]>([]);

  useEffect(() => {
    setCurrentUserData({ ...currentUserData, seventhChords2: chords });
  }, [chords]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    nextViewState();
  };

  return (
    <Container>
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
          <Grid item xs={4}>
            <Stack gap={2} alignItems={"center"}>
              <Box
                width={273}
                height={456}
                bgcolor={"card.background"}
                borderRadius="var(--borderRadius)"
                boxShadow="var(--cardShadow)"
              >
                <Stack mx={3} p={1}>
                  <Typography variant="h6" align="center">
                    Tutorial
                  </Typography>
                  <List>
                    {notationInstructions.map((value, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText
                          primary={`${index + 1}. ${value.instructionTitle}`}
                          secondary={value.instructionText}
                          primaryTypographyProps={{ fontSize: "11px" }}
                          secondaryTypographyProps={{ fontSize: "11px" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={8} margin={"auto"}>
            <Box
              width={569}
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
                    {`Write the following seventh chord: ${seventhChordsText[1]}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateChord setChords={setChords} />
                </Grid>
              </Grid>
              <CardFooter
                buttonText={"Continue >"}
                pageNumber={19}
                handleSubmit={handleSubmit}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
