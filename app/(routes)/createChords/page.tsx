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
import CheckNumBeatsInMeasure from "../../components/CheckNumBeatsInMeasure";
import {
  buttonGroup,
  clearAllMeasures,
} from "../../lib/buttonsAndButtonGroups";
import { handleChordInteraction } from "@/app/lib/handleChordInteraction";
import { setupRendererAndDrawStaves } from "@/app/lib/setupRendererAndDrawNotes";
import { INITIAL_STAVES, staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { chordInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { reducer } from "@/app/lib/reducer";

import { Chord, NoteStringData, StaveType } from "../../lib/typesAndInterfaces";

const { Renderer, StaveNote, Formatter } = VexFlow.Flow;

const ManageStaveChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_STAVES);
  const [state, dispatch] = useReducer(reducer, chordInteractionInitialState);
  const [chordsData, setChordsData] = useState<Chord>({
    keys: [],
    duration: "w",
    staveNotes: null,
    userClickY: 0,
  });

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const context = rendererRef.current?.getContext();

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

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
      setupRendererAndDrawStaves({
        rendererRef,
        ...staveData,
        setStaves,
        notesData,
        staves,
      }),
    [rendererRef, setStaves, notesData, staves]
  );

  const newChord = new StaveNote({
    keys: chordsData.keys,
    duration: chordsData.duration,
  });

  const drawNotes = () => {
    if (!rendererRef.current || chordsData.keys.length === 0) {
      return;
    } else {
      context && Formatter.FormatAndDraw(context, staves[0], [newChord]);
    }
  };

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    drawStaves();
  }, []);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    drawNotes();
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

    if (!updatedFoundNoteData) {
      noNoteFound();
      return;
    }
    //const barIndex: number = findBarIndex(staves, userClickX);

    setChordsData((prevState) => {
      if (prevState.keys.length < 4) {
        const updatedKeys = [...prevState.keys, updatedFoundNoteData.note];
        return { ...prevState, keys: updatedKeys, staveNotes: newChord };
      } else return prevState;
    });
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
