"use client";
import { keySigNotationInstructions } from "@/app/lib/data/instructions";
import keySignaturesText from "@/app/lib/data/keySignaturesText";
import { Level, MouseEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
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
import { useState } from "react";
import CardFooter from "../CardFooter";
import ClassPreferenceSelector from "../ClassPreferenceSelector";
import NotateKeySignature from "../NotateKeySignature";
import SnackbarToast from "../SnackbarToast";

export default function KeySignaturesNotation1({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const [level, setLevel] = useState<Level>("select-here");
  const [keySignatureNotation, setKeySignatureNotation] = useState([]);
  const [open, setOpen] = useState<boolean>(false);

  const keySigPropName = `keySignaturesNotation${page}`;

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    if (level === "select-here") {
      setOpen(true);
      return;
    }
    setCurrentUserData({
      ...currentUserData,
      level: level,
      [keySigPropName]: keySignatureNotation,
    });
    nextViewState();
  };

  function handleKeySigNotation(input: any) {
    setKeySignatureNotation(input);
  }

  return (
    <Container>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must select level before moving on."}
      />
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
                Section 1: Notate Key Signatures
              </Typography>
              <ClassPreferenceSelector
                level={level}
                setLevel={setLevel}
              ></ClassPreferenceSelector>
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
                    {keySigNotationInstructions.map((value, index) => (
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
                    {`Notate the following key signature: ${
                      keySignaturesText[page - 1]
                    }`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateKeySignature handleNotes={handleKeySigNotation} />
                </Grid>
              </Grid>
              <CardFooter pageNumber={page} handleSubmit={handleSubmit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
