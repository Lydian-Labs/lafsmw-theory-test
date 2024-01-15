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
} from "../lib/typesAndInterfaces";

import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave, Accidental } = VF;

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
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isEnterNotesActive, setIsEnterNotesActive] = useState(true);
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);
  const [isSharpActive, setIsSharpActive] = useState(false);
  const [isFlatActive, setIsFlatActive] = useState(false);
  const [absoluteXCoord, setAbsoluteXCoord] = useState<number[]>();

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
    setIsEnterNotesActive(false);
  };

  const enterNotes = () => {
    setIsEnterNotesActive(true);
    setIsEraserActive(false);
  };

  const clearMeasures = () => {
    setNotesData(() => INITIAL_NOTES);
    initializeRenderer();
    renderStavesAndNotes();
    setIsEraserActive(false);
  };

  const addSharp = () => {
    setIsSharpActive(!isSharpActive);
    setIsEnterNotesActive(false);
    setIsFlatActive(false);
    setIsEraserActive(false);
  };
  const addFlat = () => {
    setIsFlatActive(!isFlatActive);
    setIsEnterNotesActive(false);
    setIsSharpActive(false);
    setIsEraserActive(false);
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
            240,
            180,
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
            console.log(absoluteXCoord);
          });
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

    const barIndex = findBarIndex(blankStaves, userClickX);
    let notesDataCopy = [...notesData];
    const barOfStaveNotes = notesDataCopy[barIndex];
    console.log(barOfStaveNotes);
    if (!foundNoteDataAndUserClickData) {
      setNoteNotFound(true);
    } else if (isEraserActive) {
      const indexOfNoteToErase = indexOfNoteToModify(
        barOfStaveNotes,
        foundNoteDataAndUserClickData
      );
      barOfStaveNotes.splice(indexOfNoteToErase, 1);
    } else if (isSharpActive) {
      if (foundNoteDataAndUserClickData) {
        const indexOfNoteToSharp = indexOfNoteToModify(
          barOfStaveNotes,
          foundNoteDataAndUserClickData
        );
        barOfStaveNotes[indexOfNoteToSharp].newStaveNote.addModifier(
          new Accidental("#")
        );
      }
    } else if (isFlatActive) {
      const indexOfNoteToFlat = indexOfNoteToModify(
        barOfStaveNotes,
        foundNoteDataAndUserClickData
      );
      barOfStaveNotes[indexOfNoteToFlat].newStaveNote?.addModifier(
        new Accidental("b")
      );
    } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
      setTooManyBeatsInMeasure(true);
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
    setIsSharpActive(false);
    setIsFlatActive(false);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={tooManyBeatsInMeasure}
        setTooManyBeatsInMeasure={setTooManyBeatsInMeasure}
      />
      <Snackbar
        open={noteNotFound}
        autoHideDuration={4000}
        onClose={() => setNoteNotFound(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error">
          {"The location you clicked doesn't correspond to a note"}
        </Alert>
      </Snackbar>
      <div className="mt-2 ml-3">
        <BlueButton onClick={eraser} isEnabled={isEraserActive}>
          Eraser
        </BlueButton>
        <BlueButton onClick={enterNotes} isEnabled={isEnterNotesActive}>
          Enter Notes
        </BlueButton>
        <BlueButton onClick={clearMeasures}>Clear Measures</BlueButton>
        <BlueButton onClick={addSharp} isEnabled={isSharpActive}>
          Add Sharp
        </BlueButton>
        <BlueButton onClick={addFlat} isEnabled={isFlatActive}>
          Add Flat
        </BlueButton>
      </div>
    </>
  );
};

export default CreateAndEraseNotesFromStave;
