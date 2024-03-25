import VexFlow from "vexflow";
import createBlankStaves from "./createBlankStaves";
import { RenderStavesAndNotesParams } from "./typesAndInterfaces";

export const setupRendererAndDrawStaves = (
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
};
