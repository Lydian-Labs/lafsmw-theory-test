/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@mui/material";
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
import SimpleSnackbar from "./SnackbarToast";
import CheckIfNoteFound from "../components/CheckIfNoteFound";
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
  scales,
  setScales,
}: {
  scales: string[];
  setScales: Dispatch<SetStateAction<Array<string>>>;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [state, dispatch] = useReducer(
    scaleReducer,
    noteInteractionInitialState
  );
  const [open, setOpen] = useState<boolean>(false);

  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);

  const { chosenClef } = useClef();
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [scaleDataMatrix, setScaleDataMatrix] = useState<ScaleData[][]>([[]]);
  const noNoteFound = () => dispatch({ type: "noNoteFound" });

  const tooManyBeatsInMeasure = () =>
    dispatch({ type: "tooManyBeatsInMeasure" });

  const modifyStaveNotesButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyNotesActionTypes),
    [dispatch, state]
  );

  const renderStavesAndNotes = useCallback(() => {
    return setupRendererAndDrawNotes({
      rendererRef,
      ...staveData,
      setStaves,
      scaleDataMatrix,
      staves,
      chosenClef,
    });
  }, [rendererRef, setStaves, scaleDataMatrix, staves]);

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
  //this is the array we will use for grading
  const scaleDataForGrading = scaleDataMatrix[0].map((scaleDataMatrix) =>
    scaleDataMatrix.keys.join(", ")
  );

  useEffect(() => {
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

  const eraseMeasures = () => {
    setScaleDataMatrix([[]]);
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

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
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
      setScales(
        newScaleDataMatrix[0].map((scaleDataMatrix) =>
          scaleDataMatrix.keys.join(", ")
        )
      );
    },
    [scaleDataMatrix, notesAndCoordinates, staves, chosenClef]
  );

  return (
    <>
      <div ref={container} onClick={handleClick} />

      <CheckIfNoteFound
        noNoteFound={state.noNoteFound || false}
        openEnterNotes={dispatch}
      />
      <SimpleSnackbar
        open={open}
        setOpen={setOpen}
        message="You only need to write 7 notes for the major scale. Do not repeat the 1st note an octave above."
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
              onClick={() => {
                button.action();
              }}
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
    </>
  );
};

export default NotateScale;
