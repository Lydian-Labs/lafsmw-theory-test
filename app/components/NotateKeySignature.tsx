/* eslint-disable react-hooks/exhaustive-deps */
"use client";
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
import SnackbarToast from "../components/SnackbarToast";
import { useClef } from "../context/ClefContext";
import { modifyKeySigActionTypes } from "../lib/actionTypes";
import { buildKeySignature } from "../lib/buildKeySignature";
import { buttonGroup, clearKeySignature } from "../lib/buttonsAndButtonGroups";
import calculateNotesAndCoordinates from "../lib/calculateNotesAndCoordinates";
import { keySigArray } from "../lib/data/keySigArray";
import { staveData } from "../lib/data/stavesData";
import getUserClickInfo from "../lib/getUserClickInfo";
import { handleKeySigInteraction } from "../lib/handleKeySigInteraction";
import {
  initialNotesAndCoordsState,
  keySigInitialState,
} from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import isClickWithinStaveBounds from "../lib/isClickWithinStaveBounds";
import { keySigReducer } from "../lib/reducer";
import { setupRendererAndDrawStaves } from "../lib/setUpRenderer";
import {
  GlyphProps,
  NotesAndCoordinatesData,
  StaveType,
} from "../lib/typesAndInterfaces";
import CustomButton from "./CustomButton";
import { Button, Stack, Typography } from "@mui/material";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const NotateKeySignature = ({
  handleNotes,
  glyphs,
  setGlyphs,
  keySigStaves,
  setKeySigStaves,
}: {
  handleNotes: any;
  glyphs: GlyphProps[];
  setGlyphs: Dispatch<SetStateAction<GlyphProps[]>>;
  keySigStaves: StaveType[];
  setKeySigStaves: Dispatch<SetStateAction<StaveType[]>>;
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const { chosenClef } = useClef();
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

  const renderStaves = useCallback((): StaveType[] | undefined => {
    return setupRendererAndDrawStaves({
      rendererRef,
      ...staveData,
      chosenClef,
      firstStaveWidth: 450,
      staves: keySigStaves,
      setStaves: setKeySigStaves,
    });
  }, [rendererRef, keySigStaves, setKeySigStaves, glyphs]);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    const newStaves = renderStaves();
    if (newStaves)
      calculateNotesAndCoordinates(
        chosenClef,
        setNotesAndCoordinates,
        newStaves,
        keySigArray,
        0,
        1,
        0
      );
  }, []);

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
    context && buildKeySignature(glyphs, 40, context, keySigStaves[0]);
  }, [glyphs]);

  //this is where the we will get the array to grade
  useEffect(() => {
    handleNotes(keySig);
  }, [keySig]);

  const clearKey = () => {
    clearKeySignature(setGlyphs, rendererRef, container), setKeySig(() => []);
    const newStaves = renderStaves();

    if (newStaves) {
      if (newStaves)
        calculateNotesAndCoordinates(
          chosenClef,
          setNotesAndCoordinates,
          newStaves,
          keySigArray,
          0,
          1,
          0
        );
    }
    dispatch({ type: "" });
  };

  const handleClick = (e: React.MouseEvent) => {
    if (
      !state.isSharpActive &&
      !state.isFlatActive &&
      !state.isEraseAccidentalActive
    )
      return;

    const { userClickY, userClickX, topStaveYCoord, bottomStaveYCoord } =
      getUserClickInfo(e, container, keySigStaves[0]);

    let foundNoteData = notesAndCoordinates.find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        userClickY >= yCoordinateMin && userClickY <= yCoordinateMax
    );

    if (!foundNoteData) {
      setSnackbarMessage("Click outside of stave bounds.");
      setOpen(true);
      return;
    } else {
      foundNoteData = {
        ...foundNoteData,
        userClickX: userClickX,
      };
    }

    const { maxRightClick, minLeftClick, minTopClick, maxBottomClick } =
      isClickWithinStaveBounds(
        keySigStaves[0],
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
        glyphs,
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
      <Stack direction="row" spacing={2} mt={2}>
        <Typography marginTop={2} align="left">
          *Note: You
          <b> MUST</b> press <em>Save </em>before moving on.
        </Typography>
      </Stack>
    </>
  );
};

export default NotateKeySignature;
