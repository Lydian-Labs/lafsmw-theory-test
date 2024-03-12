"use client";
import React, { useEffect, useRef, useState, useReducer, useMemo } from "react";
import BlueButton from "../components/BlueButton";
import VexFlow from "vexflow";
import { INITIAL_STAVES } from "../lib/data/stavesData";
const VF = VexFlow.Flow;
const { Renderer } = VF;
import { initializeRenderer } from "../lib/initializeRenderer";
import { staveData } from "../lib/data/stavesData";
import { setupRendererAndDrawNotes } from "../lib/setupRendererAndDrawNotes";
import { keySigReducer } from "../lib/reducers";
import { keySigInitialState } from "../lib/initialStates";
import { getUserClickInfo } from "../lib/getUserClickInfo";
import { modifyKeySigButtonGroup } from "../lib/buttonsAndButtonGroups";
import { GlyphProps } from "../lib/typesAndInterfaces";
import { buildKeySignature } from "../lib/buildKeySignature";

const CreateKeySignatures = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [blankStaves, setBlankStaves] = useState(INITIAL_STAVES);
  const [glyphs, setGlyphs] = useState<GlyphProps[]>([]);
  const [state, dispatch] = useReducer(keySigReducer, keySigInitialState);

  const buttonGroup = useMemo(
    () => modifyKeySigButtonGroup(dispatch, state),
    [dispatch, state]
  );

  const context = rendererRef.current?.getContext();

  const renderStaves = (): void => {
    setupRendererAndDrawNotes({
      rendererRef,
      ...staveData,
      setStaves: setBlankStaves,
      staves: blankStaves,
    });
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
    const { userClickY, userClickX } = getUserClickInfo(
      e,
      container,
      blankStaves[0]
    );

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
        {buttonGroup.map((button) => {
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
      </div>
    </>
  );
};

export default CreateKeySignatures;
