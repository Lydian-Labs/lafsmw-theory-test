import VexFlow, { IRenderContext } from "vexflow";
import { GlyphProps, StaveType } from "./typesAndInterfaces";
import { roundToNearest5 } from "./roundToNearest5";
const VF = VexFlow.Flow;
const { Glyph } = VF;

export const buildKeySignature = (
  glyphs: GlyphProps[],
  sizeOfGlyph: number,
  context: IRenderContext,
  stave: StaveType
) => {
  //to do: add error handling so user can't add duplicate accidentals
  glyphs &&
    glyphs.forEach((glyphInfo) => {
      const adjustedYPosition = roundToNearest5(glyphInfo.yPosition);
      const glyph = new Glyph(glyphInfo.glyph, sizeOfGlyph);
      glyph
        .setContext(context)
        .setStave(stave)
        .render(context, glyphInfo.xPosition, adjustedYPosition);
        console.log('adjustedYPosition: ', adjustedYPosition)
    });
};
