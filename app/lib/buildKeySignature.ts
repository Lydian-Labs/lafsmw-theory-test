import VexFlow, { IRenderContext } from "vexflow";
import { GlyphProps, StaveType } from "./typesAndInterfaces";
const VF = VexFlow.Flow;
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
      console.log(glyph);
    });
};
