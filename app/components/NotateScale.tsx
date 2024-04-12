"use client";
import { Container } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import VexFlow from "vexflow";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import RegularButton from "../components/RegularButton";
import { modifyNotesActionTypes } from "../lib/actionTypes";
import { buttonGroup, clearAllMeasures } from "../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../lib/getUserClickInfo";
import { handleNoteInteraction } from "../lib/handleNoteInteraction";
import { noteInteractionInitialState } from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { reducer } from "../lib/reducer";
import { setupRendererAndDrawNotesNew } from "../lib/setupRendererAndDrawNotesNew";
import {
  NoteStringData,
  StaveNoteData,
  StaveType,
} from "../lib/typesAndInterfaces";

const { Renderer } = VexFlow.Flow;

const NotateScale = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notesData, setNotesData] = useState(INITIAL_STAVES);
  const [state, dispatch] = useReducer(reducer, noteInteractionInitialState);

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const renderer = rendererRef.current;
  renderer?.resize(480, 140);

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyNotesActionTypes),
    [dispatch, state]
  );

  const clearMeasures = () =>
    clearAllMeasures(
      setNotesData,
      INITIAL_STAVES,
      rendererRef,
      container,
      dispatch,
      renderStavesAndNotes
    );

  const renderStavesAndNotes = useCallback(
    (): void =>
      setupRendererAndDrawNotesNew({
        rendererRef,
        ...staveData,
        firstStaveWidth: 460,
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

    let notesDataCopy = [...notesData];
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
        noNoteFound={state.noNoteFound || false}
        openEnterNotes={dispatch}
      />
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: 0,
          margin: 0,
        }}
        disableGutters
      >
        {modifyStaveNotesButtonGroup.map((button) => {
          return (
            <RegularButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
            >
              {button.text}
            </RegularButton>
          );
        })}
        <RegularButton onClick={clearMeasures}>Clear Measures</RegularButton>
      </Container>
    </>
  );
};

export default NotateScale;
