import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidental,
} from "../lib/modifyNotesAndCoordinates";
import { KeySigState, NotesAndCoordinatesData } from "./typesAndInterfaces";

export const handleKeySigInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: KeySigState,
  foundNoteData: NotesAndCoordinatesData
  //keySig: string[],
) => {
  if (state.isAddSharpActive || state.isAddFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
  } else if (state.isRemoveAccidentalActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
  } else {
  }
  return {
    notesAndCoordinates,
  };
};
