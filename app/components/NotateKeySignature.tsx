/* eslint-disable react-hooks/exhaustive-deps */
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
import SnackbarToast from "../components/SnackbarToast";
import { useClef } from "../context/ClefContext";
import { modifyKeySigActionTypes } from "../lib/actionTypes";
import { buildKeySignature } from "../lib/buildKeySignature";
import getUserClickInfo from "../lib/getUserClickInfo";
import { buttonGroup, clearKeySignature } from "../lib/buttonsAndButtonGroups";
import { keySigArray } from "../lib/data/keySigArray";
import { INITIAL_STAVES, staveData } from "../lib/data/stavesData";
import generateYMinAndYMaxForKeySig from "../lib/generateYMinAndMaxForKeySig";
import { handleKeySigInteraction } from "../lib/handleKeySigInteraction";
import {
  initialNotesAndCoordsState,
  keySigInitialState,
} from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import isClickWithinStaveBounds from "../lib/isClickWithinStaveBounds";
import { keySigReducer } from "../lib/reducer";
import { setupRendererAndDrawStaves } from "../lib/setUpRenderer";
import { GlyphProps, NotesAndCoordinatesData } from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const NotateKeySignature = ({ handleNotes }: any) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [glyphs, setGlyphs] = useState<GlyphProps[]>([]);
  const [open, setOpen] = useState(false);
  const { clef } = useClef();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [state, dispatch] = useReducer(keySigReducer, keySigInitialState);
  const [keySig, setKeySig] = useState<string[]>([]);
  const [notesAndCoordinates, setNotesAndCoordinates] = useState<
    NotesAndCoordinatesData[]
  >([initialNotesAndCoordsState]);
  const keySigButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyKeySigActionTypes),
    [dispatch, state]
  );

  const renderer = rendererRef.current;
  renderer?.resize(470, 200);

  const context = rendererRef.current?.getContext();

  //function to render and return the staves
  const renderStaves = useCallback((): any => {
    setupRendererAndDrawStaves({
      rendererRef,
      ...staveData,
      clef: clef,
      firstStaveWidth: 450,
      setStaves: setBlankStaves,
      staves: blankStaves,
    });
  }, [blankStaves, setBlankStaves]);

  //useEffect that initializes the renderer for the 1st TIME, calls renderStaves, sets the notes and coordinates
  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStaves = renderStaves();
    if (newStaves) {
      const middleG = newStaves[0].getYForLine(0);
      console.log("middle G: ", middleG);
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(middleG - 7.5, keySigArray)
      );
    }
  }, []);

  //useEffect that sets initializes the renderer, sets the staves and builds the keySignature every time the glyphs change
  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
    context && buildKeySignature(glyphs, 40, context, blankStaves[0]);
  }, [glyphs]);

  //this is where the we will get the array to grade
  useEffect(() => {
    console.log("key signature: ", keySig);
    handleNotes(keySig);
  }, [keySig]);

  const clearKey = () => {
    clearKeySignature(setGlyphs, rendererRef, container), setKeySig(() => []);
    const newStaves = renderStaves();
    if (newStaves) {
      const middleG = newStaves[0].getYForLine(0);
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(middleG - 7.5, keySigArray)
      );
    }
    dispatch({ type: "" });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (
      !state.isAddSharpActive &&
      !state.isAddFlatActive &&
      !state.isRemoveAccidentalActive
    )
      return;

    const { userClickY, userClickX, topStaveYCoord, bottomStaveYCoord } =
      getUserClickInfo(e, container, blankStaves[0]);

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (!foundNoteData) {
      setSnackbarMessage("Click outside of stave bounds.");
      setOpen(true); //
      return;
    }
    const { maxRightClick, minLeftClick, minTopClick, maxBottomClick } =
      isClickWithinStaveBounds(
        blankStaves[0],
        topStaveYCoord,
        bottomStaveYCoord
      );

    if (
      typeof maxBottomClick === "undefined" ||
      userClickX < minLeftClick ||
      userClickX > maxRightClick ||
      userClickY < minTopClick ||
      userClickY > maxBottomClick
    ) {
      setSnackbarMessage("Click outside of stave bounds.");
      setOpen(true);
      return;
    }

    let notesAndCoordinatesCopy = [...notesAndCoordinates];

    const { notesAndCoordinates: newNotesAndCoordinates } =
      handleKeySigInteraction(
        notesAndCoordinatesCopy,
        state,
        foundNoteData,
        userClickX,
        userClickY,
        setGlyphs,
        setKeySig,
        keySig
      );

    setNotesAndCoordinates(() => newNotesAndCoordinates);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />

      <div>
        {keySigButtonGroup.map((button) => {
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
        <CustomButton onClick={clearKey}>Erase Key Signature</CustomButton>
      </div>
      <SnackbarToast open={open} setOpen={setOpen} message={snackbarMessage} />
    </>
  );
};

export default NotateKeySignature;
