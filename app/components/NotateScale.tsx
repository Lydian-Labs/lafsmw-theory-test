/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import React, {
  Dispatch,
  SetStateAction,
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
import { modifyNotesActionTypes } from "../lib/actionTypes";
import { buttonGroup } from "../lib/buttonsAndButtonGroups";
import { initialNotesAndCoordsState } from "../lib/data/initialNotesAndCoordinatesState";
import { staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import generateYMinAndYMaxForNotes from "../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../lib/getUserClickInfo";
import { HandleScaleInteraction } from "../lib/handleScaleInteraction";
import { noteInteractionInitialState } from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { notesArray } from "../lib/noteArray";
import { scaleReducer } from "../lib/reducer";
import { setupRendererAndDrawNotes } from "../lib/setupRendererAndDrawNotes";
import { ScaleData, StaveType } from "../lib/typesAndInterfaces";

const { Renderer } = VexFlow.Flow;

const NotateScale = ({
  setScales,
  setIsReady,
}: {
  setScales: Dispatch<SetStateAction<Array<string>>>;
  setIsReady: Dispatch<SetStateAction<boolean>>;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [scaleDataMatrix, setScaleDataMatrix] = useState<ScaleData[][]>([[]]);
  const [notesAndCoordinates, setNotesAndCoordinates] = useState([
    initialNotesAndCoordsState,
  ]);

  const [state, dispatch] = useReducer(
    scaleReducer,
    noteInteractionInitialState
  );

  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyNotesActionTypes),
    [dispatch, state]
  );

  const eraseMeasures = () => {
    setScaleDataMatrix((): ScaleData[][] => {
      return [[]];
    });
    setNotesAndCoordinates(() => generateYMinAndYMaxForNotes(147, notesArray));
    renderStavesAndNotes();
  };

  const renderStavesAndNotes = useCallback(
    (): void =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        setStaves,
        scaleDataMatrix,
        staves,
      }),
    [rendererRef, setStaves, scaleDataMatrix, staves]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStavesAndNotes();
    setNotesAndCoordinates(() => generateYMinAndYMaxForNotes(8, notesArray));
  }, []);

  //this is the array we will use for grading
  const scaleDataForGrading = scaleDataMatrix[0].map((scaleDataMatrix) =>
    scaleDataMatrix.keys.join(", ")
  );

  useEffect(() => {
    console.log("scale data for grading:", scaleDataForGrading);
    renderStavesAndNotes();
  }, [scaleDataMatrix]); // Listening to changes in scaleDataMatrix

  const handleScalesClick = (e: React.MouseEvent) => {
    setScales(scaleDataForGrading);
    setIsReady(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      staves[0]
    );
    console.log("userClickY", userClickY);

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (!foundNoteData) {
      return;
    }

    if (foundNoteData)
      foundNoteData = {
        ...foundNoteData,
        userClickY: userClickY,
      };

    const barIndex = findBarIndex(staves, userClickX);

    if (!foundNoteData) {
      noNoteFound();
      return;
    }

    let scaleDataMatrixCopy = scaleDataMatrix.map((scaleData) => [
      ...scaleData,
    ]);

    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    const barOfScaleData = scaleDataMatrixCopy[barIndex].map(
      (scaleData: ScaleData) => ({
        ...scaleData,
        staveNoteAbsoluteX: scaleData.staveNote
          ? scaleData.staveNote.getAbsoluteX()
          : 0,
      })
    );

    const {
      scaleDataMatrix: newScaleDataMatrix,
      notesAndCoordinates: newNotesAndCoordinates,
    } = HandleScaleInteraction(
      foundNoteData,
      tooManyBeatsInMeasure,
      notesAndCoordinatesCopy,
      "tooManyBeatsInMeasure",
      barOfScaleData,
      scaleDataMatrixCopy,
      state,
      userClickX,
      userClickY,
      barIndex
    );
    setNotesAndCoordinates(() => newNotesAndCoordinates);
    setScaleDataMatrix(() => newScaleDataMatrix);
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
            <BlueButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
            >
              {button.text}
            </BlueButton>
          );
        })}
        <BlueButton onClick={eraseMeasures}>Erase Measure</BlueButton>
      </Container>
      <Stack direction="row" spacing={2}>
        <Typography marginTop={2} align="left">
          *Note: You
          <b> MUST</b> press <em>Save </em>before moving on.
        </Typography>
        <Button onClick={handleScalesClick}>Save</Button>
      </Stack>
    </>
  );
};

export default NotateScale;
