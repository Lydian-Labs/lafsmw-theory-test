/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import { useClef } from "../context/ClefContext";
import { modifyChordsActionTypes } from "../lib/actionTypes";
import { buttonGroup } from "../lib/buttonsAndButtonGroups";
import calculateNotesAndCoordinates from "../lib/calculateNotesAndCoordinates";
import {
  bassClefNotesArray,
  trebleClefNotesArray,
} from "../lib/data/noteArray";
import { staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import getUserClickInfo from "../lib/getUserClickInfo";
import { handleChordInteraction } from "../lib/handleChordInteraction";
import {
  chordInteractionInitialState,
  initialChordData,
  initialNotesAndCoordsState,
} from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { chordReducer } from "../lib/reducer";
import { setupRendererAndDrawChords } from "../lib/setUpRendererAndDrawChords";
import {
  Chord,
  NotesAndCoordinatesData,
  StaveType,
} from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";
const { Renderer } = VexFlow.Flow;

const NotateChord = ({
  chords,
  chordData,
  setChordData,
  chordStaves,
  setChordStaves,
  setChords,
  setIsReady,
  isReady,
}: {
  chords: string[],
  chordData: Chord;
  setChordData: Dispatch<SetStateAction<Chord>>;
  chordStaves: StaveType[];
  setChordStaves: Dispatch<SetStateAction<StaveType[]>>;
  setChords: Dispatch<SetStateAction<Array<string>>>;
  setIsReady: Dispatch<SetStateAction<boolean>>;
  isReady: boolean;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  //const [staves, setStaves] = useState<StaveType[]>([]);
  const [state, dispatch] = useReducer(
    chordReducer,
    chordInteractionInitialState
  );
  //not currently being used, but will be used in the future
  const [barIndex, setBarIndex] = useState<number>(0);
  //const [chordData, setChordData] = useState<Chord>(initialChordData);
  const { chosenClef } = useClef();
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const modifyChordsButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );

  const renderStavesAndChords = useCallback(
    (): StaveType[] =>
      setupRendererAndDrawChords({
        rendererRef,
        ...staveData,
        setStaves: setChordStaves,
        chordData,
        staves: chordStaves,
        barIndex,
        chosenClef,
      }),
    [rendererRef, chordStaves, chordData, setChordStaves, barIndex]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStave: StaveType[] = renderStavesAndChords();
    if (newStave) {
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStave,
        chosenClef === "bass" ? bassClefNotesArray : trebleClefNotesArray,
        0,
        -3,
        -4,
        true
      );
    }
  }, [chordData]);

  useEffect(() => {
    renderStavesAndChords();
    //this is the array to use for grading
    const chordsArray = chordData.keys;
  }, [chordData]);

  const eraseChord = () => {
    setChordData((): Chord => {
      return initialChordData;
    });
    const newStave: any = renderStavesAndChords();
    if (newStave) {
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStave,
        chosenClef === "bass" ? bassClefNotesArray : trebleClefNotesArray,
        0,
        -3,
        -4,
        true
      );
    }
  };

  const handleChordsClick = (e: React.MouseEvent) => {
    setChords(chordData.keys);
    setIsReady(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      chordStaves[0]
    );
    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    let chordDataCopy = { ...chordData };
    let notesAndCoordinatesCopy = [...notesAndCoordinates];
    //not currently being used but will be used in the future
    const barIndex = findBarIndex(chordStaves, userClickX);

    let foundNoteIndex: number = -1;

    if (chordData.keys) {
      foundNoteIndex = chordData.keys.findIndex(
        (note) => note === foundNoteData?.note
      );
    }

    if (!foundNoteData) {
      noNoteFound();
      return;
    }

    const {
      chordData: newChordData,
      notesAndCoordinates: newNotesAndCoordinates,
    } = handleChordInteraction(
      notesAndCoordinatesCopy,
      state,
      foundNoteData,
      chordDataCopy,
      foundNoteIndex ? foundNoteIndex : 0,
      chosenClef
    );

    setNotesAndCoordinates(newNotesAndCoordinates);
    setChordData(newChordData);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={state.tooManyBeatsInMeasure}
        openEnterNotes={dispatch}
      />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound || false}
        openEnterNotes={dispatch}
      />
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: 0,
          margin: 0,
        }}
        disableGutters
      >
        {modifyChordsButtonGroup.map((button) => {
          return (
            <CustomButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
            >
              {button.text}
            </CustomButton>
          );
        })}
        <Button onClick={eraseChord} sx={{ m: 0.5 }}>
          Erase Measure
        </Button>
      </Container>
      <Stack direction="row" spacing={2} mt={2}>
        <Typography marginTop={2} align="left">
          *Note: You
          <b> MUST</b> press <em>Save </em>before moving on.
        </Typography>
        <Button onClick={handleChordsClick} disabled={isReady}>
          {isReady ? "Saved" : "Save"}
        </Button>
      </Stack>
    </>
  );
};

export default NotateChord;
