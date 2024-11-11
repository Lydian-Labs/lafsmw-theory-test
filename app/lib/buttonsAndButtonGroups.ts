import React from "react";
import * as VexFlow from "vexflow";
import { initializeRenderer } from "./initializeRenderer";
import {
  GlyphProps,
  ScaleData,
  StateInteraction,
  InteractionActionTypes,
} from "./typesAndInterfaces";
const { Renderer } = VexFlow.Flow;

export const enterNote = (
  dispatch: React.Dispatch<{ type: InteractionActionTypes }>
) => {
  dispatch({ type: "isEnterNoteActive" });
};

export const clearAllMeasures = (
  setScale: React.Dispatch<React.SetStateAction<ScaleData[][]>>,
  initialScale: ScaleData[][],
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  dispatch: React.Dispatch<{ type: InteractionActionTypes }>,
  renderStavesAndStaveNotes: () => void
): void => {
  setScale(() => initialScale);
  initializeRenderer(renderer, container);
  renderStavesAndStaveNotes();
  enterNote(dispatch);
};

export const buttonGroup = <Action>(
  dispatch: React.Dispatch<Action>,
  buttonState: StateInteraction,
  actionTypes: Record<string, string>
) => {
  return Object.entries(actionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey } as Action),
    text,
    stateKey,
    isEnabled: buttonState[stateKey as keyof StateInteraction],
  }));
};

export const clearKeySignature = (
  setGlyphs: React.Dispatch<React.SetStateAction<GlyphProps[]>>,
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>
): void => {
  setGlyphs(() => []);
  initializeRenderer(renderer, container);
};
