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
import { modifyKeySigActionTypes } from "../lib/actionTypes";
import { buildKeySignature } from "../lib/buildKeySignature";
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
import { setupRenderer } from "../lib/setUpRenderer";
import { GlyphProps, NotesAndCoordinatesData } from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const NotateKeySignature = ({ handleNotes }: any) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [glyphs, setGlyphs] = useState<GlyphProps[]>([]);

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
  const renderStaves = useCallback((): void => {
    setupRenderer({
      rendererRef,
      ...staveData,
      firstStaveWidth: 450,
      setStaves: setBlankStaves,
      staves: blankStaves,
    });
  }, [blankStaves, setBlankStaves]);

  const clearKey = () => {
    clearKeySignature(setGlyphs, rendererRef, container, renderStaves),
      setKeySig(() => []);
    setNotesAndCoordinates(() =>
      generateYMinAndYMaxForKeySig(42.5, keySigArray)
    );
    dispatch({ type: "" });
  };

  const getUserClickData = (
    e: React.MouseEvent,
    container: React.RefObject<HTMLDivElement>,
    stave: any
  ): any => {
    const rect = container && container.current?.getBoundingClientRect();
    const userClickY = rect ? e.clientY - rect.top : 0;
    const userClickX = rect ? e.clientX - rect.left : 0;
    const topStaveYCoord = stave && stave.getYForTopText();
    const bottomStaveYCoord = (stave && stave.getYForBottomText()) || undefined;
    return {
      rect,
      userClickY,
      userClickX,
      topStaveYCoord,
      bottomStaveYCoord,
    };
  };

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
    setNotesAndCoordinates(() =>
      generateYMinAndYMaxForKeySig(42.5, keySigArray)
    );
  }, []);

  //this is where the we will get the array to grade
  useEffect(() => {
    console.log("key signature: ", keySig);
    handleNotes(keySig);
  }, [keySig]);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
    context?.clear();
    context && buildKeySignature(glyphs, 40, context, blankStaves[0]);
  }, [glyphs]);

  const handleClick = (e: React.MouseEvent) => {
    if (
      !state.isAddSharpActive &&
      !state.isAddFlatActive &&
      !state.isRemoveAccidentalActive
    )
      return;

    const { userClickY, userClickX, topStaveYCoord, bottomStaveYCoord } =
      getUserClickData(e, container, blankStaves[0]);

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );
    if (!foundNoteData) {
      console.log("No matching note found for coordinates");
      return;
    }
    //console.log("foundNoteData: ", foundNoteData);
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
      console.log("Click outside of stave bounds");
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
        <CustomButton onClick={clearKey}>Clear Key Signature</CustomButton>
      </div>
    </>
  );
};

export default NotateKeySignature;
