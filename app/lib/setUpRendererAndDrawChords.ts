import VexFlow from "vexflow";
import createBlankStaves from "../lib/createBlankStaves";
import { RenderStavesAndChordParams } from "./typesAndInterfaces";
const { Formatter } = VexFlow.Flow;

export const setupRendererAndDrawChords = (
  params: RenderStavesAndChordParams
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
    chordData,
    staves,
    barIndex,
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

  if (!chordData.staveNotes || chordData.keys.length === 0) return;
  if (renderer && context) {
    Formatter.FormatAndDraw(context, staves[barIndex], [chordData.staveNotes]);
  }
};
