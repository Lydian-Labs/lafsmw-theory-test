import VexFlow from "vexflow";
import createBlankStaves from "../lib/createBlankStaves";
import { RenderStavesAndNotesParams } from "./typesAndInterfaces";
const { Formatter } = VexFlow.Flow;

export const setupRendererAndDrawNotes = (
  params: RenderStavesAndNotesParams
): void => {
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
  if (context && rendererRef) {
    setStaves(() =>
      createBlankStaves({
        numStaves,
        context,
        firstStaveWidth,
        x: xPositionOfStaves,
        y: yPositionOfStaves,
        regularStaveWidth: 300,
        clef,
        keySig,
      })
    );
  }
  scaleDataMatrix &&
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
};
