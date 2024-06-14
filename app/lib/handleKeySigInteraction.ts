import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidentalForKeySig,
} from "../lib/modifyNotesAndCoordinates";
import { deleteGlyphFromStave, addGlyphs } from "./modifyKeySignature";
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
    addGlyphs(xClick, yClick, state, glyphState);
  } else if (state.isRemoveAccidentalActive) {
    deleteGlyphFromStave(glyphState, xClick, yClick);
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
  }
  return {
    notesAndCoordinates,
  };
};
