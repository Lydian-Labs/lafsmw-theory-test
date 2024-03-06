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
import {
  clearAllMeasures,
  modifyStaveNotesButtonGroup,
} from "../lib/buttonsAndButtonGroups";
import { NUM_STAVES, question1 } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import GetUserClickInfo from "../lib/getUserClickInfo";
import { initializeRenderer } from "../lib/initializeRenderer";
import { handleNoteInteraction } from "../lib/handleNoteInteraction";
import { notesArray } from "../lib/noteArray";
import { reducer } from "../lib/reducer";
import { renderStavesAndNotes2 } from "../lib/renderStavesAndNotes";
import {
  NoteStringData,
  StaveNoteData,
  StaveType,
  initialState,
} from "../lib/typesAndInterfaces";
const { Renderer } = VexFlow.Flow;

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
  const renderStavesAndNotes = useCallback(
    (): void =>
      renderStavesAndNotes2({
        rendererRef,
        ...question1,
        setStaves,
        notesData,
        staves,
      }),
    [rendererRef, setStaves, notesData, staves]
  );

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

    handleNoteInteraction(
      updatedFoundNoteData,
      noNoteFound,
      tooManyBeatsInMeasure,
      "tooManyBeatsInMeasure",
      "noNoteFound",
      barOfStaveNotes,
      notesDataCopy,
      state,
      userClickX,
      userClickY,
      barIndex
    );

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
