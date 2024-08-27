import { parseNote } from "./modifyNotesAndCoordinates";
import { roundToNearest5 } from "./roundToNearest5";
import {
  GlyphProps,
  NotesAndCoordinatesData,
  StateInteraction,
} from "./typesAndInterfaces";

const tolerance = 5;

export const deleteGlyphFromStave = (
  setGlyphState: (newState: React.SetStateAction<GlyphProps[]>) => void,
  glyphState: GlyphProps[],
  xClick: number,
  yClick: number
) => {
  const newState = glyphState.filter(
    (glyph) =>
      !(
        Math.abs(glyph.xPosition + 5 - xClick) <= tolerance &&
        Math.abs(glyph.yPosition - yClick) <= tolerance
      )
  );
  setGlyphState(newState);
  return newState.length < glyphState.length;
};

export const addGlyphs = (
  userClickX: number,
  userClickY: number,
  state: StateInteraction,
  glyphs: GlyphProps[],
  setGlyphState: (newState: React.SetStateAction<GlyphProps[]>) => void
) => {
  const newState = {
    xPosition: roundToNearest5(userClickX),
    yPosition: roundToNearest5(userClickY),
    glyph: state.isSharpActive
      ? "accidentalSharp"
      : state.isFlatActive
      ? "accidentalFlat"
      : "",
  };
  for (const glyph of glyphs) {
    if (glyph.yPosition === newState.yPosition) return;
  }
  setGlyphState((prevState: GlyphProps[]) => [...prevState, newState]);
};

export const updateKeySigArrayForGrading = (
  foundNoteData: NotesAndCoordinatesData,
  state: StateInteraction,
  setKeySigState: (newState: React.SetStateAction<string[]>) => void
) => {
  const noteBase = parseNote(foundNoteData.note).noteBase;
  if (noteBase.length > 1) {
    return;
  }
  const noteWithAccidental = state.isSharpActive
    ? `${noteBase}` + "#"
    : `${noteBase}` + "b";
  setKeySigState((prevState: string[]) => {
    const newKeySig = [...prevState];
    if (!newKeySig.includes(noteWithAccidental)) {
      newKeySig.push(noteWithAccidental);
    }
    return newKeySig;
  });
};

export const deleteAccidentalFromKeySigArray = (
  foundNoteData: NotesAndCoordinatesData,
  keySigArray: string[],
  setKeySigState: (newState: React.SetStateAction<string[]>) => void
) => {
  const noteBase = parseNote(foundNoteData.note).noteBase;
  const newKeySig = [...keySigArray];
  const index = newKeySig.findIndex((note) => note[0] === noteBase);
  if (index > -1) newKeySig.splice(index, 1);
  setKeySigState(() => newKeySig);
};
