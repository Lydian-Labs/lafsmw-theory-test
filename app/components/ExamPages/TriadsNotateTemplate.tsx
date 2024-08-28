"use client";
import { chordsNotationInstructions } from "@/app/lib/data/instructions";
import triadsText from "@/app/lib/data/triadsText";
import {
  FormEvent,
  UserDataProps,
  Chord,
  StaveType,
} from "@/app/lib/typesAndInterfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CardFooter from "../CardFooter";
import NotateChord from "../NotateChord";
import TutorialModal from "../TutorialModal";
import {
  initialChordData,
  initialNotesAndCoordsState,
} from "@/app/lib/initialStates";

export default function TriadsNotation({
  currentUserData,
  setCurrentUserData,
  nextViewState,
  page,
}: UserDataProps) {
  // const [triadData, setTriadData] = useState<Chord>(
  //   currentUserData[`triadData${page - 11}`] || initialChordData
  // );
  // const [triadDataWithOctave, setTriadDataWithOctave] = useState<Chord | {}>(
  //   currentUserData[`triadDataWithOctave${page - 11}`] || {}
  // );
  // const [triadStaves, setTriadStaves] = useState<StaveType[]>(
  //   currentUserData[`triadStaves${page - 11}`] || []
  // );
  //const [triads, setTriads] = useState<string[]>([]);
  // const [notesAndCoordinatesParent, setNotesAndCoordinatesParent] = useState(
  //   currentUserData[`notesAndCoordinates${page - 11}`] ||
  //     initialNotesAndCoordsState
  // );

  const [chords, setChords] = useState<string[]>([]);

  const currentUserDataRef = useRef(currentUserData);

  const triadsPropName = `triads${page - 11}`;
  // const triadsDataPropName = `triadData${page - 11}`;
  // const triadStavesPropName = `triadStaves${page - 11}`;
  // const triadDataWithOctavePropName = `triadDataWithOctave${page - 11}`;
  // const notesAndCoordinatesPropName = `notesAndCoordinates${page - 11}`;

  // useEffect(() => {
  //   const newTriadDataWithOctave = triadData.keys.map((key) => {
  //     const [note, octave] = key.split("/");
  //     console.log(`note: ${note}, octave: ${octave}`);
  //     return octave ? key : `${note}/4`;
  //   });
  //   setTriadDataWithOctave({ ...triadData, keys: newTriadDataWithOctave });
  //   console.log(currentUserData);
  // }, [triadData, currentUserData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setCurrentUserData({
      ...currentUserDataRef.current,
      [triadsPropName]: chords,
    });
    // console.log("object from TriadsNotateTemplate.tsx:", {
    //   ...currentUserDataRef.current,
    //   [triadsPropName]: chords,
    // });
    nextViewState();
  };

  const boxStyle = {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  };

  return (
    <Container>
      <Box sx={boxStyle}>
        <Typography variant="h5" align="center" pb={2}>
          Section 4: Notate Triads
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
                    {`Write the following triad: ${triadsText[page - 12]}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <NotateChord setChords={setChords} />
                </Grid>
              </Grid>
              <CardFooter pageNumber={13} handleSubmit={handleSubmit} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
