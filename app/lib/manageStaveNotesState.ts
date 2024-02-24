import { ReactElement } from "react";
import { StateType, Action } from "./typesAndInterfaces";

export const reducer = (state: StateType, action: Action): StateType => {
  let newState = { ...state };
  for (let stateKey in newState) {
    newState[stateKey as keyof StateType] = false;
  }
  newState[action.type] = true;
  return newState;
};

export const buttonActions = () => {
  const buttonActionArray = [
    { type: "isEnterNoteActive", text: "Enter Note" },
    { type: "isEraseNoteActive", text: "Erase Note" },
    { type: "isChangeNoteActive", text: "Change Note" },
    { type: "isSharpActive", text: "Add Sharp" },
    { type: "isFlatActive", text: "Add Flat" },
    { type: "isEraseAccidentalActive", text: "Erase Accidental" },
  ];
  return buttonActionArray;
};
