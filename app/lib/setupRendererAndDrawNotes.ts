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
    staveNotesData,
    staves: blankStaves,
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
  staveNotesData &&
    staveNotesData.forEach((barData, index) => {
      if (barData) {
        const staveNotes = barData.map(({ newStaveNote }) => newStaveNote);
        if (staveNotes.length > 0) {
          context &&
            Formatter.FormatAndDraw(context, blankStaves[index], staveNotes);
        }
      }
    });
};
