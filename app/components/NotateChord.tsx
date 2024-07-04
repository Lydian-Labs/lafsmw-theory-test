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
import { useInitialRun } from "../context/initialNotesAndCoordsContext";
const { Renderer } = VexFlow.Flow;

const NotateChord = ({
  chordData,
  setChordData,
  chordStaves,
  setChordStaves,
  setChords,
  notesAndCoordinates,
  setNotesAndCoordinates,
  setIsReady,
  isReady,
}: {
  chords: string[];
  chordData: Chord;
  setChordData: Dispatch<SetStateAction<Chord>>;
  chordStaves: StaveType[];
  setChordStaves: Dispatch<SetStateAction<StaveType[]>>;
  setChords: Dispatch<SetStateAction<Array<string>>>;
  notesAndCoordinates: NotesAndCoordinatesData[];
  setNotesAndCoordinates: Dispatch<SetStateAction<NotesAndCoordinatesData[]>>;
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
  const { initialRun, setInitialRun } = useInitialRun();
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
        setStaves: setChordStaves,
        chordData,
        staves: chordStaves,
        barIndex,
        chosenClef,
      }),
    [rendererRef, setChordStaves, chordData, chordStaves]
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
    renderStavesAndChords();
  }, [chordData]);

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

  const handleChordsClick = (e: React.MouseEvent) => {
    //console.log("Saving chords", chordData.keys);
    setChords(chordData.keys);
    setIsReady(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      chordStaves[0]
    );
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
      foundNoteIndex,
      chosenClef
    );

    setNotesAndCoordinates(newNotesAndCoordinates);
    setChordData(newChordData);
    //console.log("New notes and coordinates", newNotesAndCoordinates);
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
        <Button
          onClick={eraseChord}
          sx={{ m: 0.5 }}
        >
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
