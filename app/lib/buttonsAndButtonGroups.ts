import React from "react";
import * as VexFlow from "vexflow";
const { Renderer } = VexFlow.Flow;
import { Action, StateType, StaveNoteData } from "./typesAndInterfaces";
import { initializeRenderer } from "./initializeRenderer";

// export const modifyStaveNotesButtonGroup = (
//   dispatch: React.Dispatch<Action>
// ) => {
//   const eraseNote = () => dispatch({ type: "isEraseNoteActive" });
//   const enterNote = () => dispatch({ type: "isEnterNoteActive" });
//   const addSharp = () => dispatch({ type: "isSharpActive" });
//   const addFlat = () => dispatch({ type: "isFlatActive" });
//   const eraseAccidental = () => dispatch({ type: "isEraseAccidentalActive" });
//   const changeNote = () => dispatch({ type: "isChangeNoteActive" });

//   const buttonConfig = [
//     { action: enterNote, text: "Enter Note", stateKey: "isEnterNoteActive" },
//     { action: eraseNote, text: "Erase Note", stateKey: "isEraseNoteActive" },
//     { action: changeNote, text: "Change Note", stateKey: "isChangeNoteActive" },
//     { action: addSharp, text: "Add Sharp", stateKey: "isSharpActive" },
//     { action: addFlat, text: "Add Flat", stateKey: "isFlatActive" },
//     {
//       action: eraseAccidental,
//       text: "Erase Accidental",
//       stateKey: "isEraseAccidentalActive",
//     },
//   ];

//   return buttonConfig;
// };

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

export const modifyStaveNotesButtonGroup2 = (
  dispatch: React.Dispatch<Action>,
  state: StateType
) => {
  const actionTypes = {
    isEnterNoteActive: "Enter Note",
    isEraseNoteActive: "Erase Note",
    isChangeNoteActive: "Change Note",
    isSharpActive: "Add Sharp",
    isFlatActive: "Add Flat",
    isEraseAccidentalActive: "Erase Accidental",
  };

  const buttonConfig = Object.entries(actionTypes).map(([stateKey, text]) => ({
    action: () => dispatch({ type: stateKey }),
    text,
    stateKey,
    isEnabled: state[stateKey as keyof StateType],
  }));

  return buttonConfig;
};
