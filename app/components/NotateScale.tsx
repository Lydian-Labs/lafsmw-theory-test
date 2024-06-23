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
import CheckIfNoteFound from "../components/CheckIfNoteFound";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import { useClef } from "../context/ClefContext";
import { modifyNotesActionTypes } from "../lib/actionTypes";
import { buttonGroup } from "../lib/buttonsAndButtonGroups";
import calculateNotesAndCoordinates from "../lib/calculateNotesAndCoordinates";
import {
  bassClefNotesArray,
  trebleClefNotesArray,
} from "../lib/data/noteArray";
import { staveData } from "../lib/data/stavesData";
import { findBarIndex } from "../lib/findBar";
import getUserClickInfo from "../lib/getUserClickInfo";
import { HandleScaleInteraction } from "../lib/handleScaleInteraction";
import {
  initialNotesAndCoordsState,
  noteInteractionInitialState,
} from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import { scaleReducer } from "../lib/reducer";
import { setupRendererAndDrawNotes } from "../lib/setupRendererAndDrawNotes";
import {
  NotesAndCoordinatesData,
  ScaleData,
  StaveType,
} from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";

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
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);
  const { chosenClef } = useClef();
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

  const renderStavesAndNotes = useCallback(
    (): StaveType[] =>
      setupRendererAndDrawNotes({
        rendererRef,
        ...staveData,
        setStaves,
        scaleDataMatrix,
        staves,
        chosenClef,
      }),
    [rendererRef, setStaves, scaleDataMatrix, staves]
  );

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStave = renderStavesAndNotes();
    if (newStave)
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStave,
        chosenClef === "bass" ? bassClefNotesArray : trebleClefNotesArray,
        0,
        -3,
        -4,
        true
      );
  }, []);

  useEffect(() => {
    console.log("scale data for grading:", scaleDataForGrading);
    const newStave: StaveType[] = renderStavesAndNotes();
    if (newStave) {
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStave,
        chosenClef === "bass" ? bassClefNotesArray : trebleClefNotesArray,
        0,
        -3,
        -4,
        true
      );
    }
  }, [scaleDataMatrix]);

  //this is the array we will use for grading
  const scaleDataForGrading = scaleDataMatrix[0].map((scaleDataMatrix) =>
    scaleDataMatrix.keys.join(", ")
  );

  const eraseMeasures = () => {
    setScaleDataMatrix((): ScaleData[][] => {
      return [[]];
    });
    const newStave = renderStavesAndNotes();
    if (newStave) {
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStave,
        chosenClef === "bass" ? bassClefNotesArray : trebleClefNotesArray,
        0,
        -3,
        -4,
        true
      );
    }
  };

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

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );
    console.log("userClickY: ", userClickY);
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
      barIndex,
      chosenClef
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
            <CustomButton
              key={button.text}
              onClick={button.action}
              isEnabled={button.isEnabled}
            >
              {button.text}
            </CustomButton>
          );
        })}
        <Button onClick={eraseMeasures} sx={{ m: 1 }}>
          Erase Measure
        </Button>
      </Container>
      <Stack direction="row" spacing={2} mt={2}>
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
