"use client";
import { modifyChordsActionTypes } from "@/app/lib/actionTypes";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
import BlueButton from "../../components/BlueButton";
import CheckIfNoteFound from "../../components/CheckIfNoteFound";
import { buttonGroup } from "../../lib/buttonsAndButtonGroups";
import { handleChordInteraction } from "@/app/lib/handleChordInteraction";
import { drawStavesAndNotes } from "@/app/lib/setupRendererAndDrawNotes";
import {
  INITIAL_STAVES as initialStaves,
  staveData,
} from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { chordInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { reducer } from "@/app/lib/reducer";

import { Chord, NoteStringData, StaveType } from "../../lib/typesAndInterfaces";
import { addAccidentalToChord } from "@/app/lib/modifyNotes";

const { Renderer, StaveNote, Formatter, Accidental } = VexFlow.Flow;

const ManageStaveChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [state, dispatch] = useReducer(reducer, chordInteractionInitialState);
  const [chordsData, setChordsData] = useState<Chord>({
    keys: [],
    duration: "w",
    staveNotes: null,
    userClickY: 0,
  });

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const context = rendererRef.current?.getContext();

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyChordsActionTypes),
    [dispatch, state]
  );

  const clearMeasures = () => {
    setChordsData((): Chord => {
      const newState = {
        keys: [],
        duration: "w",
        staveNotes: null,
        userClickY: 0,
      };
      return newState;
    });
    drawStaves();
  };

  const drawStaves = useCallback(
    (): void =>
      drawStavesAndNotes({
        rendererRef,
        ...staveData,
        setStaves,
        notesData: initialStaves,
        chordsData,
        staves,
      }),
    [rendererRef, setStaves, staves, chordsData]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    drawStaves();
  }, []);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    drawStaves();
  }, [chordsData]);

  let updatedFoundNoteData: NoteStringData;

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX, highGYPosition } = getUserClickInfo(
      e,
      container,
      staves[0]
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
    let chordsDataCopy = { ...chordsData };
    //if-else block
    if (!updatedFoundNoteData) {
      noNoteFound();
      return;
    } else if (state.isSharpActive || state.isFlatActive) {
      addAccidentalToChord(
        chordsDataCopy,
        updatedFoundNoteData,
        state.isSharpActive ? "#" : "b"
      );
      setChordsData(() => chordsDataCopy);
    } else {
      setChordsData((prevState) => {
        if (prevState.keys.length < 4) {
          const updatedKeys = [...prevState.keys, updatedFoundNoteData.note];
          const newChord = new StaveNote({
            keys: updatedKeys,
            duration: prevState.duration,
          });
          return { ...prevState, keys: updatedKeys, staveNotes: newChord };
        } else return prevState;
      });
    }
    //
    //const barIndex: number = findBarIndex(staves, userClickX);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <CheckIfNoteFound
        noNoteFound={state.noNoteFound || false}
        openEnterNotes={dispatch}
      />
      <div className="mt-2 ml-3">
        {modifyStaveNotesButtonGroup.map((button) => {
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

export default ManageStaveChords;

/* 

*/
