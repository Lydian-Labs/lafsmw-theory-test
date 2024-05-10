"use client";
import { modifyNotesActionTypes } from "@/app/lib/actionTypes";
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
import { addNoteToKeys } from "@/app/lib/modifyNotes";
import CheckNumBeatsInMeasure from "../../components/CheckNumBeatsInMeasure";
import {
  buttonGroup,
  clearAllMeasures,
} from "../../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { handleNoteInteraction } from "../../lib/handleNoteInteraction2";
import { noteInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { scalesReducer } from "../../lib/reducer";
import { setupRendererAndDrawNotes } from "../../lib/setupRendererAndDrawNotes";
import {
  NoteStringData,
  StaveNoteData,
  StaveType,
  FoundNoteData,
  Keys,
} from "../../lib/typesAndInterfaces";
import { addAccidentalToKeys } from "@/app/lib/modifyNotes";

const { Renderer } = VexFlow.Flow;

const ManageStaveNotes = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [staveNotesData, setStaveNotesData] = useState<StaveNoteData[][]>([[]]);
  const [keys, setKeys] = useState<Keys>([]);
  const [state, dispatch] = useReducer(
    scalesReducer,
    noteInteractionInitialState
  );
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    FoundNoteData[]
  >([{ note: "", yCoordinateMin: 0, yCoordinateMax: 0 }]);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyNotesActionTypes),
    [dispatch, state]
  );

  const clearMeasures = () => {
    clearAllMeasures(
      setStaveNotesData,
      INITIAL_STAVES,
      rendererRef,
      container,
      dispatch,
      renderStavesAndNotes
    );
  };

  const renderStavesAndNotes = useCallback(
    (): void =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        setStaves,
        staveNotesData,
        staves,
      }),
    [rendererRef, setStaves, staveNotesData, staves]
  );

  useEffect(() => {
    setNotesAndCoordinates(() =>
      generateYMinAndYMaxForAllNotes(147, notesArray)
    );
  }, []);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStavesAndNotes();
  }, []);

  useEffect(() => {
    renderStavesAndNotes();
  }, [staveNotesData]);

  // useEffect(() => {
  //   console.log("keys in use effect: ", keys);
  // }, [keys]);

  // useEffect(() => {
  //   console.log("notesAndCoordinates in use effect: ", notesAndCoordinates);
  // }, [notesAndCoordinates]);

  let updatedFoundNoteData: NoteStringData;

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      staves[0]
    );
    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (foundNoteData)
      updatedFoundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    const barIndex: number = findBarIndex(staves, userClickX);

    let notesDataCopy = [...staveNotesData];
    let notesAndCoordinatesCopy = [...notesAndCoordinates];
    let keysCopy = [...keys];

    const barOfStaveNotes: StaveNoteData[] = notesDataCopy[barIndex].map(
      (noteData: StaveNoteData) => ({
        ...noteData,
        staveNoteAbsoluteX: noteData.staveNote?.getAbsoluteX(),
        keys: noteData.staveNote.getKeys(),
        
      })
    );

    console.log("barOfStaveNotes: ", barOfStaveNotes);

    // existing code...

    const { newStaveNotesData, newKeys, newNotesAndCoordinates } =
      handleNoteInteraction(
        updatedFoundNoteData,
        noNoteFound,
        tooManyBeatsInMeasure,
        "tooManyBeatsInMeasure",
        "noNoteFound",
        barOfStaveNotes,
        notesAndCoordinatesCopy,
        keysCopy,
        updatedFoundNoteData,
        notesDataCopy,
        state,
        userClickX,
        userClickY,
        barIndex
      );

    setNotesAndCoordinates(() => newNotesAndCoordinates);
    setStaveNotesData(() => newStaveNotesData);
    setKeys(() => newKeys);
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

export default ManageStaveNotes;
