/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Container } from "@mui/material";
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
import { useClef } from "../context/ClefContext";
import { useInitialRun } from "../context/initialNotesAndCoordsContext";
import { modifyChordsActionTypes } from "../lib/actionTypes";
import { buttonGroup } from "../lib/buttonsAndButtonGroups";
import calculateNotesAndCoordinates from "../lib/calculateNotesAndCoordinates";
import {
  bassClefNotesArray,
  trebleClefNotesArray,
} from "../lib/data/noteArray";
import { staveData } from "../lib/data/stavesData";
import getUserClickInfo from "../lib/getUserClickInfo";
import { handleChordInteraction } from "../lib/handleChordInteraction";
import {
  chordInteractionInitialState,
  initialChordData,
  initialNotesAndCoordsState,
} from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { reducer } from "../lib/reducer";
import { setupRendererAndDrawChords } from "../lib/setUpRendererAndDrawChords";
import {
  Chord,
  NotesAndCoordinatesData,
  StaveType,
} from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";
import SnackbarToast from "./SnackbarToast";
import { errorMessages } from "../lib/data/errorMessages";
const { Renderer } = VexFlow.Flow;

//dim is shit-option-8
//fix regex G-maj7

const NotateChord = ({
  setChords,
}: {
  // chords: string[];
  // chordData: Chord;
  // setChordData: Dispatch<SetStateAction<Chord>>;
  // chordStaves: StaveType[];
  // setChordStaves: Dispatch<SetStateAction<StaveType[]>>;
  setChords: Dispatch<SetStateAction<Array<string>>>;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [state, dispatch] = useReducer(reducer, chordInteractionInitialState);
  const [barIndex, setBarIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [chordData, setChordData] = useState<Chord>(initialChordData);
  const { chosenClef } = useClef();
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);
  const { initialRun, setInitialRun } = useInitialRun();

  const modifyChordsButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );

  const renderStavesAndChords = useCallback(
    (): StaveType[] =>
      setupRendererAndDrawChords({
        rendererRef,
        ...staveData,
        setStaves,
        chordData,
        staves,
        barIndex,
        chosenClef,
      }),
    [rendererRef, setStaves, chordData, staves]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStave: StaveType[] = renderStavesAndChords();
    if (newStave && initialRun) {
      console.log("initial notes and chords running...");
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
    setInitialRun(false);
  }, []);

  useEffect(() => {
    const newStave = renderStavesAndChords();
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
  }, [chordData, state]);

  const eraseChord = () => {
    setChordData(initialChordData);
    const newStave: StaveType[] = renderStavesAndChords();
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
    setInitialRun(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      staves[0]
    );
    console.log("userClickX: ", userClickX);
    console.log("notes and coords on click: ", notesAndCoordinates);
    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );
    let chordDataCopy = { ...chordData };
    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    const foundNoteIndex = chordData.keys.findIndex(
      (note) => note === foundNoteData?.note
    );

    if (!foundNoteData) {
      setOpen(true);
      setMessage(errorMessages.noNoteFound);
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
      foundNoteIndex,
      chosenClef
    );

    setNotesAndCoordinates(() => newNotesAndCoordinates);
    setChordData(() => newChordData);
    setChords(newChordData.keys);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <SnackbarToast open={open} setOpen={setOpen} message={message} />
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
    </>
  );
};

export default NotateChord;
