import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidental,
} from "../lib/modifyNotesAndCoordinates";
import { KeySigState, NotesAndCoordinatesData } from "./typesAndInterfaces";

export const handleKeySigInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: KeySigState,
  foundNoteData: NotesAndCoordinatesData,
  foundNoteIndex: number
) => {
  if (state.isSharpActive || state.isFlatActive) {
    if (foundNoteIndex !== -1) {
      notesAndCoordinates = updateNotesAndCoordsWithAccidental(
        state,
        foundNoteData,
        notesAndCoordinates
      );
    }
  } else if (state.isEraseAccidentalActive) {
    if (foundNoteIndex !== -1) {
      notesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );
    }
  } else {
  }
  return {
    notesAndCoordinates,
  };
};
