"use client";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import VexFlow from "vexflow";
import RegularButton from "../components/RegularButton";
import { buildKeySignature } from "../lib/buildKeySignature";
import { buttonGroup, clearKeySignature } from "../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../lib/data/stavesData";
import deleteAccidentalFromKeySig from "../lib/deleteAccidentalFromKeySig";
import { getUserClickInfo } from "../lib/getUserClickInfo";
import { keySigInitialState } from "../lib/initialStates";
import { initializeRenderer } from "../lib/initializeRenderer";
import isClickWithinStaveBounds from "../lib/isClickWithinStaveBounds";
import { reducer } from "../lib/reducers";

import { modifyKeySigActionTypes } from "../lib/actionTypes";
import { setupRendererAndDrawNotesNew } from "../lib/setupRendererAndDrawNotesNew";
import { GlyphProps } from "../lib/typesAndInterfaces";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const NotateKeySignature = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [glyphs, setGlyphs] = useState<GlyphProps[]>([]);
  const [state, dispatch] = useReducer(reducer, keySigInitialState);

  const keySigButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyKeySigActionTypes),
    [dispatch, state]
  );

  const renderer = rendererRef.current;
  renderer?.resize(470, 200);

  const context = rendererRef.current?.getContext();

  const renderStaves = (): void => {
    setupRendererAndDrawNotesNew({
      rendererRef,
      ...staveData,
      firstStaveWidth: 450,
      setStaves: setBlankStaves,
      staves: blankStaves,
    });
  };

  const clearKey = () => {
    clearKeySignature(setGlyphs, rendererRef, container, renderStaves),
      dispatch({ type: "" });
  };

  useEffect(() => {
    initializeRenderer(rendererRef, container);
    renderStaves();
  }, []);

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
      getUserClickInfo(e, container, blankStaves[0]);

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
    )
      return;

    if (state.isRemoveAccidentalActive) {
      deleteAccidentalFromKeySig(setGlyphs, userClickX, userClickY);
      return;
    }

    setGlyphs((prevState) => [
      ...prevState,
      {
        xPosition: userClickX,
        yPosition: userClickY,
        glyph: state.isAddSharpActive
          ? "accidentalSharp"
          : state.isAddFlatActive
          ? "accidentalFlat"
          : "",
      },
    ]);
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />

      <div>
        {keySigButtonGroup.map((button) => {
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
        <RegularButton onClick={clearKey}>Clear Key Signature</RegularButton>
      </div>
    </>
  );
};

export default NotateKeySignature;
