import { GlyphProps } from "./typesAndInterfaces";

const tolerance = 5;

export const deleteAccidentalFromKeySig = (
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

export const addAccidentalToKeySig = () => {}