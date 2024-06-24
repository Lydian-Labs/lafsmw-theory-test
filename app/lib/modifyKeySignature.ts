import { parseNote } from "./modifyNotesAndCoordinates";
import {
  GlyphProps,
  KeySigState,
  NotesAndCoordinatesData,
} from "./typesAndInterfaces";
import { roundToNearest5 } from "./roundToNearest5";

const tolerance = 5;

export const deleteGlyphFromStave = (
  glyphState: (newState: React.SetStateAction<GlyphProps[]>) => void,
  xClick: number,
  yClick: number
) => {
  glyphState((prevState: GlyphProps[]) =>
    prevState.filter(
      (glyph) =>
        !(
          Math.abs(glyph.xPosition - xClick) <= tolerance &&
          Math.abs(glyph.yPosition - yClick) <= tolerance
        )
    )
  );
};

export const addGlyphs = (
  userClickX: number,
  userClickY: number,
  state: KeySigState,
  glyphState: (newState: React.SetStateAction<GlyphProps[]>) => void
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
console.log('glyphData: ', newState)
  glyphState((prevState: GlyphProps[]) => [...prevState, newState]);
};

export const updateKeySigArrayForGrading = (
  foundNoteData: NotesAndCoordinatesData,
  state: KeySigState,
  keySigState: (newState: React.SetStateAction<string[]>) => void
) => {
  const noteBase = parseNote(foundNoteData.note).noteBase;
  const noteWithAccidental = state.isSharpActive
    ? `${noteBase}` + "#"
    : `${noteBase}` + "b";
  keySigState((prevState: string[]) => {
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
  keySigState: (newState: React.SetStateAction<string[]>) => void
) => {
  console.log('foundNoteData: ', foundNoteData.note)
  const noteBase = parseNote(foundNoteData.note).noteBase;
  const newKeySig = [...keySigArray];
  if (newKeySig.includes(noteBase)) {
    const index = newKeySig.findIndex((note) => note === noteBase);
    newKeySig.splice(index, 1);
  }
  keySigState(() => newKeySig);
};
