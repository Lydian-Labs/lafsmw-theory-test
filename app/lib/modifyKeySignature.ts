import {
  GlyphProps,
  KeySigState,
  NotesAndCoordinatesData,
} from "./typesAndInterfaces";
import { parseNote } from "./modifyNotesAndCoordinates";

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
    xPosition: userClickX,
    yPosition: userClickY,
    glyph: state.isAddSharpActive
      ? "accidentalSharp"
      : state.isAddFlatActive
      ? "accidentalFlat"
      : "",
  };
  glyphState((prevState: GlyphProps[]) => [...prevState, newState]);
};

export const updateKeySigArrayForGrading = (
  foundNoteData: NotesAndCoordinatesData,
  state: KeySigState,
  keySigState: (newState: React.SetStateAction<string[]>) => void
) => {
  const noteBase = parseNote(foundNoteData.note).noteBase;
  const noteWithAccidental = state.isAddSharpActive
    ? `${noteBase}` + "#"
    : `${noteBase}` + "b";
  keySigState((prevState: string[]) => {
    const newKeySig = [...prevState];
    if (!newKeySig.includes(noteWithAccidental)) {
      newKeySig.push(noteWithAccidental);
    }
    return newKeySig;
  });

  // setKeySig((prevState) => {
  //   const newKeySig = [...prevState];
  //   if (foundNoteData?.note) {
  //     const noteBase = parseNote(foundNoteData?.note).noteBase;
  //     const noteWithAccidental = state.isAddSharpActive
  //       ? `${noteBase}` + "#"
  //       : `${noteBase}` + "b";
  //     if (!newKeySig.includes(noteWithAccidental)) {
  //       newKeySig.push(noteWithAccidental);
  //     }
  //   }
  //   return newKeySig;
  // });
};
