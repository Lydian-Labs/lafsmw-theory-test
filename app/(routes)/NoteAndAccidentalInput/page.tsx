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
import BlueButton from "@/app/components/BlueButton";
import CheckIfNoteFound from "@/app/components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "@/app/components/CheckNumBeatsInMeasure";
import { modifyNotesActionTypes } from "@/app/lib/actionTypes";
import {
  buttonGroup,
  clearAllMeasures,
} from "../../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { handleNoteInteraction } from "../../lib/handleNoteInteraction";
import { noteInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { noteInteractionReducer } from "../../lib/reducers";
import { setupRendererAndDrawNotes } from "../../lib/setupRendererAndDrawNotes";
import {
  NoteInteractionAction,
  NoteStringData,
  StaveNoteData,
  StaveType,
} from "../../lib/typesAndInterfaces";

const { Renderer } = VexFlow.Flow;

const ManageStaveNotes = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notesAndStavesData, setNotesAndStavesData] = useState(INITIAL_STAVES);
  const [state, dispatch] = useReducer(
    noteInteractionReducer,
    noteInteractionInitialState
  );

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  //render button group
  const modifyStaveNotesButtonGroup = useMemo(
    () =>
      buttonGroup<NoteInteractionAction>(
        dispatch,
        state,
        modifyNotesActionTypes
      ),
    [dispatch, state]
  );
  //clear measures
  const clearMeasures = () =>
    clearAllMeasures(
      setNotesAndStavesData,
      INITIAL_STAVES,
      rendererRef,
      container,
      dispatch,
      renderStavesAndNotes
    );

  //render staves and notes
  const renderStavesAndNotes = useCallback(
    (): void =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        setStaves,
        notesData: notesAndStavesData,
        staves,
      }),
    [rendererRef, setStaves, notesAndStavesData, staves]
  );
  //useEffect to initialize renderer and initialize staves
  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStavesAndNotes();
  }, []);

  //useEffect to render staves and notes every time notesData updates
  useEffect(() => {
    renderStavesAndNotes();
  }, [notesAndStavesData]);

  //initialize updatedNoteData to update foundNoteData
  let updatedFoundNoteData: NoteStringData;

  //handleClick function
  const handleClick = (e: React.MouseEvent) => {
    //get userClickY, userClickX, and highGPosition from getUserClickInfo
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
    if (foundNoteData)
      updatedFoundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    //find the bar the user clicked in
    const barIndex: number = findBarIndex(staves, userClickX);

    //copy the notesAndStavesData useState variable
    let notesAndStavesDataCopy = [...notesAndStavesData];

    //map through each notesData object in the measure the user clicked on and return the note and stave data and add the new property of absoluteX
    const barOfStaveNotes = notesAndStavesDataCopy[barIndex].map(
      (noteAndStaveData: StaveNoteData) => ({
        ...noteAndStaveData,
        staveNoteAbsoluteX: noteAndStaveData.newStaveNote.getAbsoluteX(),
      })
    );
    //handle all note modifications
    handleNoteInteraction(
      updatedFoundNoteData,
      noNoteFound,
      tooManyBeatsInMeasure,
      "tooManyBeatsInMeasure",
      "noNoteFound",
      barOfStaveNotes,
      notesAndStavesDataCopy,
      state,
      userClickX,
      userClickY,
      barIndex
    );
    //set the notes and staves data with the copy of  notesAndStavesDataCopy
    setNotesAndStavesData(() => notesAndStavesDataCopy);
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
