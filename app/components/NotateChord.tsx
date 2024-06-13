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
import { modifyChordsActionTypes } from "../lib/actionTypes";
import { buttonGroup } from "../lib/buttonsAndButtonGroups";
import { initialChordData } from "../lib/data/initialChordData";
import { initialNotesAndCoordsState } from "../lib/data/initialNotesAndCoordinatesState";
import { staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import { handleChordInteraction } from "../lib/handleChordInteraction";
import { chordInteractionInitialState } from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { chordReducer } from "../lib/reducer";
import { setupRendererAndDrawChords } from "../lib/setUpRendererAndDrawChords";
import {
  Chord,
  NotesAndCoordinatesData,
  StaveType,
  Stave,
} from "../lib/typesAndInterfaces";

const { Renderer, Stave } = VexFlow.Flow;

const NotateChord = ({
  setChords,
}: {
  setChords: Dispatch<SetStateAction<Array<string>>>;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [state, dispatch] = useReducer(
    chordReducer,
    chordInteractionInitialState
  );
  const [barIndex, setBarIndex] = useState<number>(0);
  const [chordData, setChordData] = useState<Chord>(initialChordData);

  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);

  const TOLERANCE = 5;

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const modifyChordsButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );

  const getUserClickData = (
    e: React.MouseEvent,
    container: React.RefObject<HTMLDivElement>
  ): any => {
    const rect = container && container.current?.getBoundingClientRect();
    const userClickY = rect ? e.clientY - rect.top : 0;
    const userClickX = rect ? e.clientX - rect.left : 0;

    return {
      rect,
      userClickY,
      userClickX,
    };
  };

  const generateYMinAndYMax = (
    topNoteYCoordinate: number,
    notes: string[]
  ): NotesAndCoordinatesData[] => {
    return notes.map((note, index) => {
      const originalNote = note;
      const yCoordinateMin = topNoteYCoordinate + index * 5;
      const yCoordinateMax = yCoordinateMin + TOLERANCE;

      return { originalNote, note, yCoordinateMin, yCoordinateMax };
    });
  };

  const eraseChord = () => {
    setChordData((): Chord => {
      return initialChordData;
    });
    const newStave: Stave = renderStavesAndChords();
    if (newStave) {
      const highG = newStave[0].getYForLine(-4);
      setNotesAndCoordinates(() =>
        generateYMinAndYMax(highG - 2.5, notesArray)
      );
    }
  };

  const renderStavesAndChords = useCallback(
    (): any =>
      setupRendererAndDrawChords({
        rendererRef,
        ...staveData,
        setStaves,
        chordData,
        staves,
        barIndex,
      }),
    [rendererRef, setStaves, chordData, staves, barIndex]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStave: Stave = renderStavesAndChords();
    if (newStave) {
      const highG = newStave[0].getYForLine(-4);
      setNotesAndCoordinates(() =>
        generateYMinAndYMax(highG - 2.5, notesArray)
      );
    }
  }, []);

  useEffect(() => {
    renderStavesAndChords();
  }, [chordData]);

  const handleChordsClick = (e: React.MouseEvent) => {
    setChords(chordData.keys);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickData(e, container);

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    let chordDataCopy = { ...chordData };
    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    const barIndex = findBarIndex(staves, userClickX);

    const foundNoteIndex: number = chordData.keys.findIndex(
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
      foundNoteIndex
    );

    setNotesAndCoordinates(() => newNotesAndCoordinates);
    setChordData(() => newChordData);
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
            <Button key={button.text} onClick={button.action} sx={{ m: 0.5 }}>
              {button.text}
            </Button>
          );
        })}
        <Button onClick={eraseChord} sx={{ m: 0.5 }}>
          Erase Chord
        </Button>
      </Container>
      <Stack direction="row" spacing={2} mt={2}>
        <Typography marginTop={2} align="left">
          *Note: You
          <b> MUST</b> press <em>Save </em>before moving on.
        </Typography>
        <Button onClick={handleChordsClick}>Save</Button>
      </Stack>
    </>
  );
};

export default NotateChord;
