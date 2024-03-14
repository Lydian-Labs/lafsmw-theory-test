import React from "react";
import * as VexFlow from "vexflow";
const { Renderer } = VexFlow.Flow;
import { GlyphProps } from "./typesAndInterfaces";
import {
  KeySigAction,
  KeySigState,
  NoteInteractionAction,
  NoteInteractionState,
  StaveNoteData,
} from "./typesAndInterfaces";
import { initializeRenderer } from "./initializeRenderer";
const modifyNotesActionTypes = {
  isEnterNoteActive: "Enter Note",
  isEraseNoteActive: "Erase Note",
  isChangeNoteActive: "Change Note",
  isSharpActive: "Add Sharp",
  isFlatActive: "Add Flat",
  isEraseAccidentalActive: "Erase Accidental",
};

const modifyKeySigActionTypes = {
  isAddSharpActive: "Add Sharp",
  isAddFlatActive: "Add Flat",
  isRemoveSharpActive: "Remove Sharp",
  isRemoveFlatActive: "Remove Flat",
};

export const enterNote = (dispatch: React.Dispatch<NoteInteractionAction>) => {
  dispatch({ type: "isEnterNoteActive" });
};

export const clearAllMeasures = (
  setNotes: React.Dispatch<React.SetStateAction<StaveNoteData[][]>>,
  initialNotes: StaveNoteData[][],
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  dispatch: React.Dispatch<NoteInteractionAction>,
  renderStavesAndStaveNotes: () => void
): void => {
  setNotes(() => initialNotes);
  initializeRenderer(renderer, container);
  renderStavesAndStaveNotes();
  enterNote(dispatch);
};

export const modifyStaveNotesButtonGroup = (
  dispatch: React.Dispatch<NoteInteractionAction>,
  state: NoteInteractionState
) => {
  return Object.entries(modifyNotesActionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey }),
    text,
    stateKey,
    isEnabled: state[stateKey as keyof NoteInteractionState],
  }));
};

export const modifyKeySigButtonGroup = (
  dispatch: React.Dispatch<KeySigAction>,
  state: KeySigState
) => {
  return Object.entries(modifyKeySigActionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey }),
    text,
    stateKey,
    isEnabled: state[stateKey as keyof KeySigState],
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
