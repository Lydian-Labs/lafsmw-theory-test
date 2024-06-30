import createBlankStaves from "./createBlankStaves";
import {
  BlankStaves,
  RenderStavesAndGlyphs,
  StaveType,
} from "./typesAndInterfaces";
import { roundToNearest5 } from "./roundToNearest5";
import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { Glyph } = VF;

export const setupRendererAndDrawGlyphs = (
  params: RenderStavesAndGlyphs
): BlankStaves | undefined => {
  const {
    rendererRef,
    font,
    fontSize,
    numStaves,
    rendererWidth,
    rendererHeight,
    yPositionOfStaves,
    xPositionOfStaves,
    chosenClef,
    firstStaveWidth,
    keySig,
    setStaves,
    glyphs,
    sizeOfGlyph,
    staves,
  } = params;
  const renderer = rendererRef?.current;
  renderer?.resize(rendererWidth, rendererHeight);
  const context = renderer && renderer.getContext();
  context?.setFont(font, fontSize);
  context?.clear();
  let newStaves: StaveType[] = [];
  if (context && rendererRef) {
    newStaves = createBlankStaves({
      numStaves,
      context,
      firstStaveWidth,
      x: xPositionOfStaves,
      y: yPositionOfStaves,
      regularStaveWidth: 300,
      chosenClef,
      keySig,
    });
    setStaves(newStaves);
  }
  glyphs &&
    glyphs.forEach((glyphInfo) => {
      const adjustedYPosition = roundToNearest5(glyphInfo.yPosition);
      const glyph = new Glyph(glyphInfo.glyph, sizeOfGlyph);
      if (context)
        glyph
          .setContext(context)
          .setStave(staves[0])
          .render(context, glyphInfo.xPosition, adjustedYPosition);
    });
  if (context && rendererRef) return newStaves;
};
