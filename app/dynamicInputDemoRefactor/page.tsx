"use client";
import { notesArray } from "../lib/noteArray";
import React, { useEffect, useRef, useState } from "react";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import BlueButton from "../components/BlueButton";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import { indexOfNoteToModify } from "../lib/indexOfNoteToModify";
import {
  StaveType,
  StaveNoteType,
  StaveNoteAbsoluteXCoordUserClickY,
  NoteStringYMinAndYMaxUserClickY,
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

const INITIAL_NOTES: StaveNoteAbsoluteXCoordUserClickY[][] = new Array(
  NUM_STAVES
).fill([]);

const CreateAndEraseNotesFromStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_NOTES); //contains staveNote need to update userClickX
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

  const addAccidentalToNote = (
    barOfStaveNotes: StaveNoteAbsoluteXCoordUserClickY[],
    userClickX: number,
    accidental: string
  ) => {
    const indexOfNote: number = indexOfNoteToModify(
      barOfStaveNotes,
      userClickX
    );
    if (barOfStaveNotes[indexOfNote]?.newStaveNote) {
      barOfStaveNotes[indexOfNote].newStaveNote.addModifier(
        new Accidental(accidental)
      );
    }
  };

  const buttons = [
    { button: eraser, text: "Eraser", stateFunction: state.isEraserActive },
    {
      button: enterNotes,
      text: "Enter Notes",
      stateFunction: state.isEnterNotesActive,
    },
    { button: addSharp, text: "Add Sharp", stateFunction: state.isSharpActive },
    { button: addFlat, text: "Add Flat", stateFunction: state.isFlatActive },
  ];

  const clearMeasures = () => {
    setNotesData(() => INITIAL_NOTES);
    initializeRenderer();
    renderStavesAndNotes();
  };

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

  let foundNoteDataAndUserClickY: NoteStringYMinAndYMaxUserClickY;

  const handleClick = (e: React.MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    const userClickY = rect ? e.clientY - rect.top : 0;
    const userClickX = rect ? e.clientX - rect.left : 0;
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
      foundNoteDataAndUserClickY = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    const barIndex: number = findBarIndex(blankStaves, userClickX);

    let notesDataCopy = [...notesData];
    const barOfStaveNotes = notesDataCopy[barIndex].map((noteData) => ({
      ...noteData,
      staveNoteAbsoluteX: noteData.newStaveNote.getAbsoluteX(),
    }));
    if (!foundNoteDataAndUserClickY) {
      toggleState("noNoteFound");
    } else if (state.isEraserActive) {
      const indexOfNoteToErase = indexOfNoteToModify(
        barOfStaveNotes,
        userClickX
      );
      barOfStaveNotes.splice(indexOfNoteToErase, 1);
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (state.isSharpActive) {
      addAccidentalToNote(barOfStaveNotes, userClickX, "#");
    } else if (state.isFlatActive) {
      addAccidentalToNote(barOfStaveNotes, userClickX, "b");
    } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
      toggleState("tooManyBeatsInMeasure");
    } else {
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: [foundNoteDataAndUserClickY.note],
        duration: "q",
      });

      notesDataCopy[barIndex] = [
        ...barOfStaveNotes,
        {
          newStaveNote,
          staveNoteAbsoluteX: 0,
          userClickY,
        },
      ];
    }
    setNotesData(() => notesDataCopy);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={state.tooManyBeatsInMeasure}
        openEnterNotes={enterNotes}
      />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound}
        openEnterNotes={enterNotes}
      />
      <div className="mt-2 ml-3">
        {buttons.map((button, index) => {
          return (
            <BlueButton
              key={button.text}
              onClick={button.button}
              isEnabled={button.stateFunction}
            >
              {button.text}
            </BlueButton>
          );
        })}
        <BlueButton onClick={clearMeasures}>Clear Measures</BlueButton>
      </div>
    </>
  );
};

export default CreateAndEraseNotesFromStave;
