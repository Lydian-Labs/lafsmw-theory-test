import VexFlow from "vexflow";
import CreateBlankStaves from "../components/CreateBlankStaves";
const { Formatter } = VexFlow.Flow;
import { RenderStavesAndNotesParams } from "./typesAndInterfaces";

export const renderStavesAndNotes2 = (
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
    timeSig,
    firstStaveWidth,
    regularStaveWidth,
    setStaves,
    notesData,
    staves: blankStaves,
  } = params;
  const renderer = rendererRef?.current;
  renderer?.resize(rendererWidth, rendererHeight);
  const context = renderer && renderer.getContext();
  context?.setFont(font, fontSize);
  context?.clear();
  if (context && rendererRef) {
    context &&
      setStaves(() =>
        CreateBlankStaves(
          numStaves,
          context,
          firstStaveWidth,
          regularStaveWidth,
          xPositionOfStaves,
          yPositionOfStaves,
          clef,
          timeSig
        )
      );
  }
  notesData &&
    notesData.forEach((barData, index) => {
      if (barData) {
        const staveNotes = barData.map(({ newStaveNote }) => newStaveNote);
        if (staveNotes.length > 0) {
          context &&
            Formatter.FormatAndDraw(context, blankStaves[index], staveNotes);
        }
      }
    });
};
