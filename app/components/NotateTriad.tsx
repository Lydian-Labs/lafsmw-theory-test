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

const NotateTriad = ({
  triadData,
  setTriadData,
  triadDataWithOctave,
  setTriadDataWithOctave,
  triadStaves,
  setTriadStaves,
  setTriads,
  setIsReady,
  isReady,
}: {
  chords: string[];
  triadData: Chord;
  setTriadData: Dispatch<SetStateAction<Chord>>;
  triadDataWithOctave: Chord;
  setTriadDataWithOctave: Dispatch<SetStateAction<Chord>>;
  triadStaves: StaveType[];
  setTriadStaves: Dispatch<SetStateAction<StaveType[]>>;
  setTriads: Dispatch<SetStateAction<Array<string>>>;
  setIsReady: Dispatch<SetStateAction<boolean>>;
  isReady: boolean;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [state, dispatch] = useReducer(
    chordReducer,
    chordInteractionInitialState
  );
  const [barIndex, setBarIndex] = useState<number>(0);
  const { chosenClef } = useClef();
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);
  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const modifyChordsButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );
  const handleEnableSave = () => {
    setIsReady(false);
  };

  const renderStavesAndChords = useCallback(
    (): StaveType[] =>
      setupRendererAndDrawChords({
        rendererRef,
        ...staveData,
        setStaves: setTriadStaves,
        chordData: triadDataWithOctave,
        staves: triadStaves,
        barIndex,
        chosenClef,
      }),
    [rendererRef, setTriadStaves, triadDataWithOctave, triadStaves]
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
  }, []);

  useEffect(() => {
    renderStavesAndChords();
    //this is the array to use for grading
    const chordsArray = triadData.keys;
  }, [triadData]);

  const eraseChord = () => {
    setTriadData((): Chord => {
      return initialChordData;
    });
    handleEnableSave();
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

  const triadDataForGrading = triadData.keys;

  const handleChordsClick = (e: React.MouseEvent) => {
    setTriads(triadDataForGrading);
    setIsReady(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      triadStaves[0]
    );

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );
    let triadDataWithOctaveCopy = { ...triadDataWithOctave };
    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    const foundNoteIndex = triadData.keys.findIndex(
      (note) => note === foundNoteData?.note
    );

    if (!foundNoteData) {
      noNoteFound();
      return;
    }

    const {
      chordData: newTriadDataWithOctave,
      notesAndCoordinates: newNotesAndCoordinates,
    } = handleChordInteraction(
      notesAndCoordinatesCopy,
      state,
      foundNoteData,
      triadDataWithOctaveCopy,
      foundNoteIndex,
      chosenClef
    );

    setNotesAndCoordinates(newNotesAndCoordinates);
    setTriadData(newTriadDataWithOctave);
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
              onClick={() => {
                button.action();
                handleEnableSave();
              }}
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

export default NotateTriad;
