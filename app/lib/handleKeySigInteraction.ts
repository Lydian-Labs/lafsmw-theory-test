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
  setGlyphState: (newState: React.SetStateAction<GlyphProps[]>) => void,
  glyphState: GlyphProps[],
  setKeySigState: (newState: React.SetStateAction<string[]>) => void,
  keySig: string[]
) => {
  if (state.isSharpActive || state.isFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    addGlyphs(xClick, yClick, state, glyphState, setGlyphState);
    updateKeySigArrayForGrading(foundNoteData, state, setKeySigState);
  } else if (state.isEraseAccidentalActive) {
    const glyphWasDeleted = deleteGlyphFromStave(
      setGlyphState,
      glyphState,
      xClick,
      yClick
    );
    console.log(glyphWasDeleted);
    if (glyphWasDeleted) {
      deleteAccidentalFromKeySigArray(foundNoteData, keySig, setKeySigState);
      notesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );
    }
  }
  return {
    notesAndCoordinates,
  };
};
