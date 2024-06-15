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
import { notationInstructions } from "@/app/lib/data/instructions";
import { FormEvent, UserDataProps } from "@/app/lib/typesAndInterfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFooter from "../CardFooter";
import NotateChord from "../NotateChord";
import SnackbarToast from "../SnackbarToast";

export default function NotateSeventhChords4({
  currentUserData,
  setCurrentUserData,
  nextViewState,
}: UserDataProps) {
  const [chords, setChords] = useState<string[]>([]);
  const currentUserDataRef = useRef(currentUserData);
  const [open, setOpen] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  const memoizedSetCurrentUserData = useCallback(
    (data: any) => {
      setCurrentUserData(data);
    },
    [setCurrentUserData]
  );

  useEffect(() => {
    currentUserDataRef.current = currentUserData;
  }, [currentUserData]);

  useEffect(() => {
    memoizedSetCurrentUserData({
      ...currentUserDataRef.current,
      seventhChords4: chords,
    });
  }, [chords, memoizedSetCurrentUserData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setOpen(true);
    } else {
      nextViewState();
    }
  };

  return (
    <Container>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must press Save before moving on."}
      />
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
                    {`Write the following seventh chord: ${seventhChordsText[3]}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateChord setChords={setChords} setIsReady={setIsReady} />
                </Grid>
              </Grid>
              <CardFooter
                buttonText={"Continue >"}
                pageNumber={21}
                handleSubmit={handleSubmit}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
