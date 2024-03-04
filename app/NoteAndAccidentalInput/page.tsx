"use client";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import VexFlow from "vexflow";
import BlueButton from "../components/BlueButton";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import {
  clearAllMeasures,
  modifyStaveNotesButtonGroup,
} from "../lib/buttonsAndButtonGroups";
import {
  BEATS_IN_MEASURE,
  NUM_STAVES,
  question1,
} from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import GetUserClickInfo from "../lib/getUserClickInfo";
import { indexOfNoteToModify } from "../lib/indexOfNoteToModify";
import { initializeRenderer } from "../lib/initializeRenderer";
import {
  addAccidentalToNote,
  changeNotePosition,
  deleteAccidental,
  deleteNote,
} from "../lib/modifyNotes";
import { notesArray } from "../lib/noteArray";
import { reducer } from "../lib/reducer";
import { renderStavesAndNotes2 } from "../lib/renderStavesAndNotes";
import {
  NoteStringData,
  StaveNoteData,
  StaveNoteType,
  StaveType,
  initialState,
} from "../lib/typesAndInterfaces";
const { Renderer, StaveNote } = VexFlow.Flow;

const INITIAL_NOTES: StaveNoteData[][] = new Array(NUM_STAVES).fill([]);

const ManageStaveNotes = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_NOTES);
  const [state, dispatch] = useReducer(reducer, initialState);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const buttonGroup = useMemo(
    () => modifyStaveNotesButtonGroup(dispatch, state),
    [dispatch, state]
  );

  const clearMeasures = () =>
    clearAllMeasures(
      setNotesData,
      INITIAL_NOTES,
      rendererRef,
      container,
      dispatch,
      renderStavesAndNotes
    );
  const renderStavesAndNotes = (): void =>
    renderStavesAndNotes2({
      rendererRef,
      ...question1,
      setStaves,
      notesData,
      staves,
    });

  useEffect(() => {
    initializeRenderer(rendererRef, container);
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
      staves[0] //array index doesn't matter because we are using this argument to find the height of the top stave
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

    const barIndex: number = findBarIndex(staves, userClickX);

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
      deleteNote(barOfStaveNotes, userClickX);
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (state.isEraseAccidentalActive) {
      deleteAccidental(barOfStaveNotes, userClickX);
      notesDataCopy[barIndex] = barOfStaveNotes;
    } else if (state.isChangeNoteActive) {
      changeNotePosition(
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
        openEnterNotes={dispatch}
      />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound}
        openEnterNotes={dispatch}
      />
      <div className="mt-2 ml-3">
        {buttonGroup.map((button) => {
          return (
            <BlueButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
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
