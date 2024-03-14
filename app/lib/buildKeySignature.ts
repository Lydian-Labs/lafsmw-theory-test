import VexFlow, { IRenderContext } from "vexflow";
const VF = VexFlow.Flow;
import { GlyphProps, StaveType } from "./typesAndInterfaces";
const { Glyph } = VF;

export const buildKeySignature = (
  glyphs: GlyphProps[],
  sizeOfGlyph: number,
  context: IRenderContext,
  stave: StaveType
) => {
  glyphs &&
    glyphs.forEach((glyphInfo) => {
      const glyph = new Glyph(glyphInfo.glyph, sizeOfGlyph);
      glyph
        .setContext(context)
        .setStave(stave)
        .render(context, glyphInfo.xPosition, glyphInfo.yPosition);
    });
};
