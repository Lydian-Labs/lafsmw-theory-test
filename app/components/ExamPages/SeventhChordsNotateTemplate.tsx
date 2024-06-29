"use client";
import { chordsNotationInstructions } from "@/app/lib/data/instructions";
import seventhChordsText from "@/app/lib/data/seventhChordsText";
import {
  FormEvent,
  UserDataProps,
  InputState,
  Chord,
  StaveType,
} from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFooter from "../CardFooter";
import NotateChord from "../NotateChord";
import SnackbarToast from "../SnackbarToast";
import TutorialModal from "../TutorialModal";
import { initialChordData } from "@/app/lib/initialStates";

export default function NotateSeventhChords({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  const [chords, setChords] = useState<string[]>([]);
  const currentUserDataRef = useRef(currentUserData);
  const [open, setOpen] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [chordData, setChordData] = useState<Chord>(
    currentUserData[`chordData${page - 17}`] || initialChordData
  );
  const [chordStaves, setChordStaves] = useState<StaveType[]>(
    currentUserData[`chordStaves${page - 17}`] || []
  );

  const seventhChordsPropName = `seventhChords${page - 17}`;
  const seventhChordDataPropName = `chordData${page - 17}`;
  const seventhChordStavesPropName = `chordStaves${page - 17}`;

  const memoizedSetCurrentUserData = useCallback(
    (data: InputState) => {
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
      [seventhChordsPropName]: chords,
      [seventhChordDataPropName]: chordData,
      [seventhChordStavesPropName]: chordStaves,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chords, chordData, chordStaves, memoizedSetCurrentUserData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isReady) {
      setOpen(true);
    } else {
      nextViewState();
    }
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Container>
      <SnackbarToast
        open={open}
        setOpen={setOpen}
        message={"You must press Save before moving on."}
      />
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 5: Notate Seventh Chords
        </Typography>
        <TutorialModal tutorialInstructions={chordsNotationInstructions} />
      </Box>
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
          <Grid item xs={12} margin={"auto"}>
            <Box
              width={750}
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
                    {`Write the following seventh chord: ${
                      seventhChordsText[page - 18]
                    }`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateChord
                    chordData={chordData}
                    setChordData={setChordData}
                    setChordStaves={setChordStaves}
                    chordStaves={chordStaves}
                    setChords={setChords}
                    setIsReady={setIsReady}
                    isReady={isReady}
                  />
                </Grid>
              </Grid>
              <CardFooter
                buttonText={"Continue >"}
                pageNumber={page}
                handleSubmit={handleSubmit}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
