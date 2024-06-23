import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidental,
} from "../lib/modifyNotesAndCoordinates";
import {
  addGlyphs,
  deleteAccidentalFromKeySigArray,
  deleteGlyphFromStave,
  updateKeySigArrayForGrading,
} from "./modifyKeySignature";
import {
  GlyphProps,
  KeySigState,
  NotesAndCoordinatesData,
} from "./typesAndInterfaces";

export const handleKeySigInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: KeySigState,
  foundNoteData: NotesAndCoordinatesData,
  xClick: number,
  yClick: number,
  glyphState: (newState: React.SetStateAction<GlyphProps[]>) => void,
  keySigState: (newState: React.SetStateAction<string[]>) => void,
  keySig: string[]
) => {
  if (state.isAddSharpActive || state.isAddFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    addGlyphs(xClick, yClick, state, glyphState);
    updateKeySigArrayForGrading(foundNoteData, state, keySigState);
  } else if (state.isRemoveAccidentalActive) {
    deleteGlyphFromStave(glyphState, xClick, yClick);
    deleteAccidentalFromKeySigArray(foundNoteData, keySig, keySigState);
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
  }
  return {
    notesAndCoordinates,
  };
};
