import React from "react";
import * as VexFlow from "vexflow";
import { initializeRenderer } from "./initializeRenderer";
import {
  GlyphProps,
  NoteInteractionAction,
  ScaleData,
} from "./typesAndInterfaces";
const { Renderer } = VexFlow.Flow;

export const enterNote = (dispatch: React.Dispatch<NoteInteractionAction>) => {
  dispatch({ type: "isEnterNoteActive" });
};

export const clearAllMeasures = (
  setScale: React.Dispatch<React.SetStateAction<ScaleData[][]>>,
  initialScale: ScaleData[][],
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  dispatch: React.Dispatch<NoteInteractionAction>,
  renderStavesAndStaveNotes: () => void
): void => {
  setScale(() => initialScale);
  initializeRenderer(renderer, container);
  renderStavesAndStaveNotes();
  enterNote(dispatch);
};

export const buttonGroup = <Action>(
  dispatch: React.Dispatch<Action>,
  buttonState: { [key: string]: any },
  actionTypes: { [key: string]: any }
) => {
  return Object.entries(actionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey } as Action),
    text,
    stateKey,
    isEnabled: buttonState[stateKey],
  }));
};

export const clearKeySignature = (
  setGlyphs: React.Dispatch<React.SetStateAction<GlyphProps[]>>,
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  renderStaves: () => void
): void => {
  setGlyphs(() => []);
  initializeRenderer(renderer, container);
  renderStaves();
};
