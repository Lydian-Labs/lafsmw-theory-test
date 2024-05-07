import React from "react";
import * as VexFlow from "vexflow";
import { initializeRenderer } from "./initializeRenderer";
import {
  FoundNoteData,
  GlyphProps,
  NoteInteractionAction,
  StaveNoteData,
} from "./typesAndInterfaces";
const { Renderer } = VexFlow.Flow;
import generateYMinAndYMaxForAllNotes from "./generateYMinAndMaxForAllNotes";
import { notesArray } from "./noteArray";
export const enterNote = (dispatch: React.Dispatch<NoteInteractionAction>) => {
  dispatch({ type: "isEnterNoteActive" });
};

export const clearAllMeasures = (
  setNotes: React.Dispatch<React.SetStateAction<StaveNoteData[][]>>,
  initialNotes: StaveNoteData[][],
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  dispatch: React.Dispatch<NoteInteractionAction>,
  renderStavesAndStaveNotes: () => void,
): void => {
  setNotes(() => initialNotes);
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
