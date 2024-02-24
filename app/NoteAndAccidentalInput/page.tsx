"use client";
import React, { useEffect, useRef, useState, useReducer } from "react";
import BlueButton from "../components/BlueButton";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import GetUserClickInfo from "../lib/getUserClickInfo";
import { indexOfNoteToModify } from "../lib/indexOfNoteToModify";
import { notesArray } from "../lib/noteArray";
import {
  addAccidentalToNote,
  eraseAccidentalFunction,
  changeNoteFunction,
} from "../lib/modifyNotes";
import {
  NoteStringData,
  StaveNoteData,
  StaveNoteType,
  StaveType,
  initialState,
} from "../lib/typesAndInterfaces";
import { reducer, buttonActions } from "../lib/manageStaveNotesState";
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

  const [state, dispatch] = useReducer(reducer, initialState);

  const eraseNote = () => dispatch({ type: "isEraseNoteActive" });
  const enterNote = () => dispatch({ type: "isEnterNoteActive" });
  const addSharp = () => dispatch({ type: "isSharpActive" });
  const addFlat = () => dispatch({ type: "isFlatActive" });
  const eraseAccidental = () => dispatch({ type: "isEraseAccidentalActive" });
  const changeNote = () => dispatch({ type: "isChangeNoteActive" });
  const noNoteFound = () => dispatch({ type: "noNoteFound" });
  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const buttonConfig = [
    { action: enterNote, text: "Enter Note", stateKey: "isEnterNoteActive" },
    { action: eraseNote, text: "Erase Note", stateKey: "isEraseNoteActive" },
    { action: changeNote, text: "Change Note", stateKey: "isChangeNoteActive" },
    { action: addSharp, text: "Add Sharp", stateKey: "isSharpActive" },
    { action: addFlat, text: "Add Flat", stateKey: "isFlatActive" },
    {
      action: eraseAccidental,
      text: "Erase Accidental",
      stateKey: "isEraseAccidentalActive",
    },
  ];

  const buttons = buttonConfig.map(({ action, text, stateKey }) => ({
    button: action,
    text,
    stateFunction: state[stateKey],
  }));

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
      noNoteFound();
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
      changeNoteFunction(
        barOfStaveNotes,
        userClickX,
        updatedFoundNoteData,
        userClickY
      );
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
      tooManyBeatsInMeasure();
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
