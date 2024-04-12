"use client";
import { modifyKeySigActionTypes } from "@/app/lib/actionTypes";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import VexFlow from "vexflow";
import BlueButton from "../../components/BlueButton";
import { buildKeySignature } from "../../lib/buildKeySignature";
import {
  buttonGroup,
  clearKeySignature,
} from "../../lib/buttonsAndButtonGroups";
import { INITIAL_STAVES, staveData } from "../../lib/data/stavesData";
import deleteAccidentalFromKeySig from "../../lib/deleteAccidentalFromKeySig";
import { getUserClickInfo } from "../../lib/getUserClickInfo";
import { keySigInitialState } from "../../lib/initialStates";
import { initializeRenderer } from "../../lib/initializeRenderer";
import isClickWithinStaveBounds from "../../lib/isClickWithinStaveBounds";
import { reducer } from "../../lib/reducer";
import { setupRendererAndDrawNotes } from "../../lib/setupRendererAndDrawNotes";
import { GlyphProps } from "../../lib/typesAndInterfaces";
const VF = VexFlow.Flow;
const { Renderer } = VF;

const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [glyphs, setGlyphs] = useState<GlyphProps[]>([]);
  const [state, dispatch] = useReducer(reducer, keySigInitialState);

  const modifyKeySigButtonGroup = useMemo(
    () => buttonGroup(dispatch, state, modifyKeySigActionTypes),
    [dispatch, state]
  );

  const context = rendererRef.current?.getContext();
  const renderStaves = (): void => {
    setupRendererAndDrawNotes({
      rendererRef,
      ...staveData,
      firstStaveWidth: 300,
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

      <div className="mt-2 ml-3">
        {modifyKeySigButtonGroup.map((button) => {
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
        <BlueButton onClick={clearKey}>Clear Key Signature</BlueButton>
      </div>
    </>
  );
};

export default CreateKeySignatures;
