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

import { notationInstructions } from "@/app/lib/instructions";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useState } from "react";
import NotateScale from "../NotateScale";
import CardFooter from "../CardFooter";

export default function NotateTriads({
  currentUserData,
  setCurrentUserData,
}: UserDataProps) {
  const [chordNotation, setChordNotation] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      ...currentUserData,
      chordNotation: chordNotation,
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
        <Grid container spacing={4} p={2}>
          <Grid item xs={4}>
            <Stack gap={2} alignItems={"center"}>
              <Typography variant="h6" align="center">
                Section 4: Write Triads
              </Typography>
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
                    Write the following triads:
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateScale />
                </Grid>
              </Grid>
              <CardFooter questionNumber={4} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
