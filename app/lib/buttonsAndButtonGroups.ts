import React from "react";
import * as VexFlow from "vexflow";
const { Renderer } = VexFlow.Flow;
import { Action, StateType, StaveNoteData } from "./typesAndInterfaces";
import { initializeRenderer } from "./initializeRenderer";

const actionTypes = {
  isEnterNoteActive: "Enter Note",
  isEraseNoteActive: "Erase Note",
  isChangeNoteActive: "Change Note",
  isSharpActive: "Add Sharp",
  isFlatActive: "Add Flat",
  isEraseAccidentalActive: "Erase Accidental",
};

export const enterNote = (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: "isEnterNoteActive" });
};

export const clearAllMeasures = (
  setNotes: React.Dispatch<React.SetStateAction<StaveNoteData[][]>>,
  initialNotes: StaveNoteData[][],
  renderer: React.MutableRefObject<InstanceType<typeof Renderer> | null>,
  container: React.MutableRefObject<HTMLDivElement | null>,
  dispatch: React.Dispatch<Action>,
  renderStavesAndStaveNotes: () => void
): void => {
  setNotes(() => initialNotes);
  initializeRenderer(renderer, container);
  renderStavesAndStaveNotes();
  enterNote(dispatch);
};

export const modifyStaveNotesButtonGroup = (
  dispatch: React.Dispatch<Action>,
  state: StateType
) => {
  return Object.entries(actionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey }),
    text,
    stateKey,
    isEnabled: state[stateKey as keyof StateType],
  }));
};
