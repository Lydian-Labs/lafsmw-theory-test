import { GlyphProps, KeySigState } from "./typesAndInterfaces";

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
