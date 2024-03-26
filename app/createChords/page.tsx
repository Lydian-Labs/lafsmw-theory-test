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
import { handleNoteInteraction } from "../lib/handleNoteInteraction";
import { chordInteractionInitialState } from "../lib/initialStates";
import { ChordType } from "../lib/typesAndInterfaces";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { chordInteractionReducer } from "../lib/reducers";
import { setupRendererAndDrawStaves } from "../lib/setUpRendererAndDrawChords";
import {
  ChordInteractionAction,
  NoteStringData,
  StaveNoteData,
  StaveType,
} from "../lib/typesAndInterfaces";
const { Renderer, StaveNote, Formatter } = VexFlow.Flow;

const ManageStaveChords = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [initialStaves, setInitialStaves] = useState(INITIAL_STAVES);
  const [chordsData, setChordsData] = useState<ChordType>({
    keys: [],
    duration: "w",
  });
  const [state, dispatch] = useReducer(
    chordInteractionReducer,
    chordInteractionInitialState
  );
  const renderer = rendererRef.current;
  const context = renderer?.getContext();
  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const createChordsButtonGroup = useMemo(
    () =>
      buttonGroup<ChordInteractionAction>(
        dispatch,
        state,
        modifyChordsActionTypes
      ),
    [state, dispatch]
  );

  const clearMeasures = () => {
    clearAllMeasures(
      setInitialStaves,
      INITIAL_STAVES,
      rendererRef,
      container,
      dispatch,
      renderStaves
    ),
      setChordsData((): ChordType => {
        const newState = { keys: [], duration: "w" };
        return newState;
      });
  };

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
    const newChord = new StaveNote({
      keys: chordsData.keys,
      duration: chordsData.duration,
    });
    if (staves.length > 0 && context) {
      Formatter.FormatAndDraw(context, staves[0], [newChord]);
    }
  };

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
  }, []);

  useEffect(() => {
    renderStaves();
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
        userClickY,
        note: foundNoteData.note,
      };
    const barIndex: number = findBarIndex(staves, userClickX);

    let initialStavesCopy = [...initialStaves];

    const barOfStaveNotes = initialStavesCopy[barIndex].map(
      (noteData: StaveNoteData) => ({
        ...noteData,
      })
    );

    setChordsData((prevChordsData) => {
      if (prevChordsData.keys.length < 4) {
        const updatedKeys = [...prevChordsData.keys, updatedFoundNoteData.note];
        return { ...prevChordsData, keys: updatedKeys };
      } else {
        // Here you could also handle feedback to the user that no more notes can be added
        return prevChordsData; // Return the previous state without changes
      }
    });

    handleNoteInteraction(
      updatedFoundNoteData,
      noNoteFound,
      tooManyBeatsInMeasure,
      "tooManyBeatsInMeasure",
      "noNoteFound",
      barOfStaveNotes,
      initialStavesCopy,
      state,
      userClickX,
      userClickY,
      barIndex
    );
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
