"use client";
import React, { useEffect, useRef, useState } from "react";
import BlueButton from "../components/BlueButton";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { addAccidentalToNote } from "../lib/addAccidental";
import { eraseAccidentalFunction } from "../lib/eraseAccidentalFunction";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import GetUserClickInfo from "../lib/getUserClickInfo";
import { indexOfNoteToModify } from "../lib/indexOfNoteToModify";
import { notesArray } from "../lib/noteArray";

import {
  NoteStringData,
  StateType,
  StaveNoteData,
  StaveNoteType,
  StaveType,
} from "../lib/typesAndInterfaces";

import VexFlow from "vexflow";

const { Formatter, Renderer, StaveNote } = VexFlow.Flow;

const CLEF = "treble";
const TIME_SIG = "4/4";
const BEATS_IN_MEASURE = parseInt(TIME_SIG.split("/")[0]);
let NUM_STAVES = 4;
let Y_POSITION_OF_STAVES = 150;

const INITIAL_NOTES: StaveNoteData[][] = new Array(NUM_STAVES).fill([]);

const ManageStaveNotes = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_NOTES);
  const [state, setState] = useState<StateType>({
    isEraseNoteActive: false,
    isEraseAccidentalActive: false,
    isEnterNoteActive: true,
    isSharpActive: false,
    noNoteFound: false,
    tooManyBeatsInMeasure: false,
    isFlatActive: false,
    isChangeNoteActive: false,
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

  const eraseNote = () => toggleState("isEraseNoteActive");
  const enterNote = () => toggleState("isEnterNoteActive");
  const addSharp = () => toggleState("isSharpActive");
  const addFlat = () => toggleState("isFlatActive");
  const eraseAccidental = () => toggleState("isEraseAccidentalActive");
  const changeNote = () => toggleState("isChangeNoteActive");

  const buttons = [
    {
      button: enterNote,
      text: "Enter Note",
      stateFunction: state.isEnterNoteActive,
    },
    {
      button: eraseNote,
      text: "Erase Note",
      stateFunction: state.isEraseNoteActive,
    },
    {
      button: changeNote,
      text: "Change Note",
      stateFunction: state.isChangeNoteActive,
    },
    { button: addSharp, text: "Add Sharp", stateFunction: state.isSharpActive },
    { button: addFlat, text: "Add Flat", stateFunction: state.isFlatActive },
    {
      button: eraseAccidental,
      text: "Erase Accidental",
      stateFunction: state.isEraseAccidentalActive,
    },
  ];

  const clearMeasures = (): void => {
    setNotesData(() => INITIAL_NOTES);
    initializeRenderer();
    renderStavesAndNotes();
    enterNote();
  };

  const initializeRenderer = (): void => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  const renderStavesAndNotes = (): void => {
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    if (context) {
      context &&
        setBlankStaves(() =>
          KaseyBlankStaves(
            NUM_STAVES,
            context,
            250,
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
        }
      }
    });
  };

  useEffect(() => {
    initializeRenderer();
    renderStavesAndNotes();
  }, []);

  useEffect(() => {
    renderStavesAndNotes();
  }, [notesData]);

  let updatedFoundNoteData: NoteStringData;

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX, highGYPosition } = GetUserClickInfo(
      e,
      container,
      blankStaves[0] //array index doesn't matter because we are using this argument to find the height of the top stave
    );

    let foundNoteData = generateYMinAndYMaxForAllNotes(
      highGYPosition,
      notesArray
    ).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (foundNoteData)
      updatedFoundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    const barIndex: number = findBarIndex(blankStaves, userClickX);

    let notesDataCopy = [...notesData];
    const barOfStaveNotes = notesDataCopy[barIndex].map((noteData) => ({
      ...noteData,
      staveNoteAbsoluteX: noteData.newStaveNote.getAbsoluteX(),
    }));

    if (!updatedFoundNoteData) {
      toggleState("noNoteFound");
    } else if (state.isSharpActive || state.isFlatActive) {
      addAccidentalToNote(
        barOfStaveNotes,
        userClickX,
        state.isSharpActive ? "#" : "b",
        indexOfNoteToModify
      );
    } else if (state.isEraseNoteActive) {
      const indexOfNoteToErase = indexOfNoteToModify(
        barOfStaveNotes,
        userClickX
      );
      barOfStaveNotes.splice(indexOfNoteToErase, 1);
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (state.isEraseAccidentalActive) {
      eraseAccidentalFunction(barOfStaveNotes, userClickX);
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (state.isChangeNoteActive) {
      const indexOfNote = indexOfNoteToModify(barOfStaveNotes, userClickX);
      const savedUserClickX = barOfStaveNotes[indexOfNote].staveNoteAbsoluteX;
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: [updatedFoundNoteData.note],
        duration: "q",
      });

      barOfStaveNotes.splice(indexOfNote, 1, {
        newStaveNote,
        staveNoteAbsoluteX: savedUserClickX,
        userClickY,
      });
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
      toggleState("tooManyBeatsInMeasure");
    } else {
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: [updatedFoundNoteData.note],
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
        openEnterNotes={enterNote}
      />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound}
        openEnterNotes={enterNote}
      />
      <div className="mt-2 ml-3">
        {buttons.map((button) => {
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

export default ManageStaveNotes;
