import VexFlow from "vexflow";
import createBlankStaves from "./createBlankStaves";
import { RenderStavesAndNotesParams } from "./typesAndInterfaces";
const { Formatter } = VexFlow.Flow;

export const setupRendererAndDrawNotes = (
  params: RenderStavesAndNotesParams
): any => {
  const {
    rendererRef,
    font,
    fontSize,
    numStaves,
    rendererWidth,
    rendererHeight,
    yPositionOfStaves,
    xPositionOfStaves,
    clef,
    firstStaveWidth,
    keySig,
    setStaves,
    scaleDataMatrix,
    staves,
  } = params;
  const renderer = rendererRef?.current;
  renderer?.resize(rendererWidth, rendererHeight);
  const context = renderer && renderer.getContext();
  context?.setFont(font, fontSize);
  context?.clear();
  let newStaves;
  if (context && rendererRef) {
    newStaves = createBlankStaves({
      numStaves,
      context,
      firstStaveWidth,
      x: xPositionOfStaves,
      y: yPositionOfStaves,
      regularStaveWidth: 300,
      clef,
      keySig,
    });
    setStaves(newStaves);
  }
  if (!scaleDataMatrix) return newStaves;
  scaleDataMatrix.forEach((barOfNoteObjects, index) => {
    if (barOfNoteObjects) {
      const staveNotes = barOfNoteObjects
        .map(({ staveNote }) => staveNote)
        .filter(Boolean) as VexFlow.Flow.StaveNote[];
      if (staveNotes.length > 0 && context && staves[index]) {
        Formatter.FormatAndDraw(context, staves[index], staveNotes);
      }
    }
  });
  return newStaves;
};
