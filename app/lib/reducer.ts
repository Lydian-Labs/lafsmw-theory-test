import { StateType, Action } from "./typesAndInterfaces";

export const reducer = (state: StateType, action: Action): StateType => {
  switch (action.type) {
    case "isEnterNoteActive":
      return {
        ...state,
        isEnterNoteActive: true,
        isEraseNoteActive: false,
        isChangeNoteActive: false,
        isSharpActive: false,
        isFlatActive: false,
        isEraseAccidentalActive: false,
      };
    case "isEraseNoteActive":
      return {
        ...state,
        isEnterNoteActive: false,
        isEraseNoteActive: true,
        isChangeNoteActive: false,
        isSharpActive: false,
        isFlatActive: false,
        isEraseAccidentalActive: false,
      };
    case "isChangeNoteActive":
      return {
        ...state,
        isEnterNoteActive: false,
        isEraseNoteActive: false,
        isChangeNoteActive: true,
        isSharpActive: false,
        isFlatActive: false,
        isEraseAccidentalActive: false,
      };
    case "isSharpActive":
      return {
        ...state,
        isEnterNoteActive: false,
        isEraseNoteActive: false,
        isChangeNoteActive: false,
        isSharpActive: true,
        isFlatActive: false,
        isEraseAccidentalActive: false,
      };
    case "isFlatActive":
      return {
        ...state,
        isEnterNoteActive: false,
        isEraseNoteActive: false,
        isChangeNoteActive: false,
        isSharpActive: false,
        isFlatActive: true,
        isEraseAccidentalActive: false,
      };
    case "isEraseAccidentalActive":
      return {
        ...state,
        isEnterNoteActive: false,
        isEraseNoteActive: false,
        isChangeNoteActive: false,
        isSharpActive: false,
        isFlatActive: false,
        isEraseAccidentalActive: true,
      };
    default:
      return state;
  }
};
