"use client";
import { notesArray } from "../lib/noteArray";
import { Alert, Snackbar } from "@mui/material/";
import React, { useEffect, useRef, useState } from "react";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import BlueButton from "../components/BlueButton";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import { indexOfNoteToModify } from "../lib/indexOfNoteToModify";
import {
  StaveType,
  StaveNoteType,
  StaveNoteAndUserClickXAndYCoords,
  NoteStringYMinAndYMaxAndUserClickCoords,
  StateType,
} from "../lib/typesAndInterfaces";

import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Accidental } = VF;

const CLEF = "treble";
const TIME_SIG = "4/4";
const BEATS_IN_MEASURE = parseInt(TIME_SIG.split("/")[0]);
let NUM_STAVES = 4;
let Y_POSITION_OF_STAVES = 150;

const INITIAL_NOTES: StaveNoteAndUserClickXAndYCoords[][] = new Array(
  NUM_STAVES
).fill([]);

const CreateAndEraseNotesFromStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_NOTES);
  const [state, setState] = useState<StateType>({
    isEraserActive: false,
    isEnterNotesActive: true,
    isSharpActive: false,
    noNoteFound: false,
    tooManyBeatsInMeasure: false,
    isFlatActive: false,
  });
  const toggleState = (key: keyof StateType) => {
    setState((prevState: StateType) => {
      let newState: StateType = { ...prevState };
      for (let stateKey in newState) {
        newState[stateKey as keyof StateType] = false;
      }
      newState[key] = true;
      return newState;
    });
  };

  const eraser = () => toggleState("isEraserActive");
  const enterNotes = () => toggleState("isEnterNotesActive");
  const addSharp = () => toggleState("isSharpActive");
  const addFlat = () => toggleState("isFlatActive");

  const clearMeasures = () => {
    setNotesData(() => INITIAL_NOTES);
    initializeRenderer();
    renderStavesAndNotes();
  };

  let foundNoteDataAndUserClickData: NoteStringYMinAndYMaxAndUserClickCoords;
  const initializeRenderer = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  const renderStavesAndNotes = () => {
    const renderer = rendererRef.current;
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    if (context) {
      context &&
        setBlankStaves(() =>
          KaseyBlankStaves(
            NUM_STAVES,
            context,
            220,
            160,
            10,
            Y_POSITION_OF_STAVES,
            CLEF,
            TIME_SIG
          )
        );
    }
    notesData.forEach((barData, index) => {
      if (barData) {
        const staveNotes = barData.map(({ newStaveNote }) => newStaveNote);
        if (staveNotes.length > 0) {
          context &&
            Formatter.FormatAndDraw(context, blankStaves[index], staveNotes);
          const staveNotesWithCoords = staveNotes.map((note, index) => {
            const absoluteXCoord = note.getAbsoluteX();
            return absoluteXCoord;
          });

          console.log(staveNotesWithCoords);
        }
      }
    });
  };

  useEffect(() => {
    initializeRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context &&
      setBlankStaves(
        KaseyBlankStaves(
          4,
          context,
          240,
          180,
          10,
          Y_POSITION_OF_STAVES,
          CLEF,
          TIME_SIG
        )
      );
  }, []);

  useEffect(() => {
    renderStavesAndNotes();
  }, [notesData]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    const userClickX = rect ? e.clientX - rect.left : 0;
    const userClickY = rect ? e.clientY - rect.top : 0;
    const topStaveYPosition = blankStaves[0].getYForTopText();

    const highGYPosition: number = topStaveYPosition - 33;

    let foundNoteData = generateYMinAndYMaxForAllNotes(
      highGYPosition,
      notesArray
    ).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (foundNoteData)
      foundNoteDataAndUserClickData = {
        ...foundNoteData,
        userClickX: userClickX,
        userClickY: userClickY,
      };

    const barIndex: number = findBarIndex(blankStaves, userClickX);
    let notesDataCopy = [...notesData];
    const barOfStaveNotes = notesDataCopy[barIndex];
    if (!foundNoteDataAndUserClickData) {
      toggleState("noNoteFound");
    } else if (state.isEraserActive) {
      const indexOfNoteToErase = indexOfNoteToModify(
        barOfStaveNotes,
        foundNoteDataAndUserClickData
      );
      barOfStaveNotes.splice(indexOfNoteToErase, 1);
    } else if (state.isSharpActive) {
      if (foundNoteDataAndUserClickData) {
        const indexOfNoteToSharp = indexOfNoteToModify(
          barOfStaveNotes,
          foundNoteDataAndUserClickData
        );
        barOfStaveNotes[indexOfNoteToSharp].newStaveNote.addModifier(
          new Accidental("#")
        );
      }
    } else if (state.isFlatActive) {
      const indexOfNoteToFlat = indexOfNoteToModify(
        barOfStaveNotes,
        foundNoteDataAndUserClickData
      );
      barOfStaveNotes[indexOfNoteToFlat].newStaveNote?.addModifier(
        new Accidental("b")
      );
    } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
      toggleState("tooManyBeatsInMeasure");
    } else {
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: [foundNoteDataAndUserClickData.note],
        duration: "q",
      });
      if (notesData)
        notesDataCopy[barIndex] = [
          ...barOfStaveNotes,
          { newStaveNote, userClickX, userClickY },
        ];
    }
    setNotesData(() => notesDataCopy);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />

      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={state.tooManyBeatsInMeasure}
        setTooManyBeatsInMeasure={enterNotes}
      />

      <Snackbar
        open={state.noNoteFound}
        autoHideDuration={3000}
        onClose={() => enterNotes()}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error">
          {"The location you clicked doesn't correspond to a note"}
        </Alert>
      </Snackbar>
      <div className="mt-2 ml-3">
        <BlueButton onClick={eraser} isEnabled={state.isEraserActive}>
          Eraser
        </BlueButton>
        <BlueButton onClick={enterNotes} isEnabled={state.isEnterNotesActive}>
          Enter Notes
        </BlueButton>
        <BlueButton onClick={clearMeasures}>Clear Measures</BlueButton>
        <BlueButton onClick={addSharp} isEnabled={state.isSharpActive}>
          Add Sharp
        </BlueButton>
        <BlueButton onClick={addFlat} isEnabled={state.isFlatActive}>
          Add Flat
        </BlueButton>
      </div>
    </>
  );
};

export default CreateAndEraseNotesFromStave;
