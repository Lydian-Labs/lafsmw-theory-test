"use client";
import { modifyNotesActionTypes } from "../../lib/actionTypes";
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
import { INITIAL_STAVES, staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { handleNoteInteraction } from "../../lib/handleNoteInteraction";
import { noteInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { reducer } from "../../lib/reducer";
import { setupRendererAndDrawNotes } from "../../lib/setupRendererAndDrawNotes";
import {
  NoteStringData,
  StaveNoteData,
  StaveType,
} from "../../lib/typesAndInterfaces";

const { Renderer } = VexFlow.Flow;

const ManageStaveNotes = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [scaleData, setScaleData] = useState(INITIAL_STAVES);
  const [state, dispatch] = useReducer(reducer, noteInteractionInitialState);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyNotesActionTypes),
    [dispatch, state]
  );

  const clearMeasures = () => {
    clearAllMeasures(
      setScaleData,
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
        scaleDataMatrix: scaleData,
        staves,
      }),
    [rendererRef, setStaves, scaleData, staves]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStavesAndNotes();
  }, []);

  useEffect(() => {
    renderStavesAndNotes();
  }, [scaleData]);

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

    const barIndex: number = findBarIndex(staves, userClickX);

    let notesDataCopy = [...scaleData];

    const barOfStaveNotes = notesDataCopy[barIndex].map(
      (noteData: StaveNoteData) => ({
        ...noteData,
        staveNoteAbsoluteX: noteData.newStaveNote.getAbsoluteX(),
      })
    );

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

    setScaleData(() => notesDataCopy);
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
