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
import CheckNumBeatsInMeasure from "../../components/CheckNumBeatsInMeasure";
import { buttonGroup } from "../../lib/buttonsAndButtonGroups";
import { initialNotesAndCoordsState } from "@/app/lib/data/initialNotesAndCoordinatesState";
import { staveData } from "../../lib/data/stavesData";
import { findBarIndex } from "../../lib/findBar";
import generateYMinAndYMaxForAllNotes from "../../lib/generateYMinAndMaxForAllNotes";
import getUserClickInfo from "../../lib/getUserClickInfo";
import { HandleScaleInteraction } from "../../lib/handleScaleInteraction";
import { noteInteractionInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import { notesArray } from "../../lib/noteArray";
import { scaleReducer } from "../../lib/reducer";
import { setupRendererAndDrawNotes } from "../../lib/setupRendererAndDrawNotes";
import { ScaleData, StaveType } from "../../lib/typesAndInterfaces";

const { Renderer } = VexFlow.Flow;

const ManageScales = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [barIndex, setBarIndex] = useState<number>(0);
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
    setNotesAndCoordinates(() =>
      generateYMinAndYMaxForAllNotes(147, notesArray)
    );
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
  }, [scaleDataMatrix]);

  useEffect(() => {
    console.log("scaleDataMatrix Updated:", scaleDataMatrix);
  }, [scaleDataMatrix]); // Listening to changes in scaleDataMatrix

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
        <BlueButton onClick={eraseMeasures}>Erase Measure</BlueButton>
      </div>
    </>
  );
};

export default ManageScales;
