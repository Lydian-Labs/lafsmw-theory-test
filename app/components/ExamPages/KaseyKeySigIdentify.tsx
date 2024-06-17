"use client";
import { inputInstructions } from "@/app/lib/data/instructions";
import { InputData, UserDataProps } from "@/app/lib/typesAndInterfaces";
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
import { useRef } from "react";
import CardFooter from "../CardFooter";
import KaseyIdentifyNotation from "../KaseyIdentifyNotation";

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

  return (
    <Container>
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
          <Grid item xs={4}>
            <Stack gap={2} alignItems={"center"}>
              <Typography variant="h6" align="center">
                Section 2: Identify Key Signatures
              </Typography>
              <Box
                width={273}
                height={375}
                bgcolor={"card.background"}
                borderRadius="var(--borderRadius)"
                boxShadow="var(--cardShadow)"
              >
                <Stack mx={3} p={1}>
                  <Typography variant="h6" align="center">
                    Tutorial
                  </Typography>
                  <List>
                    {inputInstructions.map((value, index) => (
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
                  <KaseyIdentifyNotation
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
