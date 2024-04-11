"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
import BlueButton from "../components/BlueButton";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import { modifyChordsActionTypes } from "../lib/actionTypes";
import { buttonGroup, clearAllMeasures } from "../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../lib/getUserClickInfo";
import handleChordInteraction from "../lib/handleChordInteraction";
import { chordInteractionInitialState } from "../lib/initialStates";
import { ChordType } from "../lib/typesAndInterfaces";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { addAccidentalToNoteInChord } from "../lib/modifyNotes";
import { chordInteractionReducer } from "../lib/reducers";
import { setupRendererAndDrawStaves } from "../lib/setUpRendererAndDrawChords";
import {
  ChordInteractionAction,
  StaveType,
  NoteStringData,
} from "../lib/typesAndInterfaces";
import { set } from "firebase/database";
const { Renderer, StaveNote, Formatter, Accidental } = VexFlow.Flow;

const ManageStaveChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [initialStaves, setInitialStaves] = useState(INITIAL_STAVES);
  const [chordsData, setChordsData] = useState<ChordType>({
    keys: [],
    duration: "w",
    staveNotes: null,
    userClickY: 0,
  });
  const [state, dispatch] = useReducer(
    chordInteractionReducer,
    chordInteractionInitialState
  );
  const renderer = rendererRef.current;
  const context = renderer?.getContext();

  //functions

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  //render button group
  const createChordsButtonGroup = useMemo(
    () =>
      buttonGroup<ChordInteractionAction>(
        dispatch,
        state,
        modifyChordsActionTypes
      ),
    [state, dispatch]
  );

  //clear measures and set initialStaves and notes back to an empty stave
  const clearMeasures = () => {
    clearAllMeasures(
      setInitialStaves,
      INITIAL_STAVES,
      rendererRef,
      container,
      dispatch,
      renderStaves
    ),
      setChordsData(() => {
        const newState = {
          keys: [],
          duration: "w",
          staveNotes: null,
          userClickY: 0,
        };
        return newState;
      });
  };

  //render staves and notes function ****
  const renderStaves = useCallback(
    (): void =>
      setupRendererAndDrawStaves({
        rendererRef,
        ...staveData,
        setStaves,
        staves,
      }),

    [rendererRef, setStaves, staves]
  );
  const drawNotes = () => {
    if (!rendererRef.current || chordsData.keys.length === 0) {
      return;
    }
    if (staves.length > 0 && context && chordsData.staveNotes) {
      Formatter.FormatAndDraw(context, staves[0], [chordsData.staveNotes]);
    }
  };

  //useEffect to initialize renderer and initialize staves
  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
  }, []);

  //useEffect to render staves and notes every time ChordsData updates
  useEffect(() => {
    renderStaves();
    drawNotes();
  }, [chordsData]);

  //inititalize updatedFoundNoteata
  let updatedFoundNoteData: NoteStringData;

  //handle click function
  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX, highGYPosition } = getUserClickInfo(
      e,
      container,
      staves[0]
    );

    //inititalize foundNoteData by generating the Y min and max for all notes. Find the userClick that is greater than or equal to the minimum Y coordinate but less that or equal to the max coordinate. Return the noteData object
    let foundNoteData = generateYMinAndYMaxForAllNotes(
      highGYPosition,
      notesArray
    ).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    //update the foundNoteData with the userClickY
    if (foundNoteData) {
      updatedFoundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };
    }

    //handle all note modifications
    if (!updatedFoundNoteData) {
      noNoteFound();
      return;
    }
    //set the chordsData using the previous state
    if (chordsData.keys.length >= 4) {
      return;
    } else {
      setChordsData((prevState) => {
        const updatedKays = [...prevState.keys, updatedFoundNoteData.note];
        const newChord = new StaveNote({
          keys: updatedKays,
          duration: prevState.duration,
        });

        return {
          ...prevState,
          keys: updatedKays,
          staveNotes: newChord,
          userClickY,
        };
      });
    }
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
        {createChordsButtonGroup.map((button) => {
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
