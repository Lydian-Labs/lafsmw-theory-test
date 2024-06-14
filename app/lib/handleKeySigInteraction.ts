import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidentalForKeySig,
} from "../lib/modifyNotesAndCoordinates";
import { deleteAccidentalFromKeySig } from "./modifyKeySignature";
import {
  KeySigState,
  NotesAndCoordinatesData,
  GlyphProps,
} from "./typesAndInterfaces";

export const handleKeySigInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: KeySigState,
  foundNoteData: NotesAndCoordinatesData,
  xClick: number,
  yClick: number,
  glyphState: (newState: React.SetStateAction<GlyphProps[]>) => void
  //keySig: string[],
) => {
  if (state.isAddSharpActive || state.isAddFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidentalForKeySig(
      state,
      foundNoteData,
      notesAndCoordinates
    );
  } else if (state.isRemoveAccidentalActive) {
    deleteAccidentalFromKeySig(glyphState, xClick, yClick);
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
