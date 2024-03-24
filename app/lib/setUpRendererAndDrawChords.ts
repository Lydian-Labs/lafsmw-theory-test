import VexFlow from "vexflow";
import createBlankStaves from "./createBlankStaves";
import { RenderStavesAndNotesParams } from "./typesAndInterfaces";
const { Formatter, StaveNote } = VexFlow.Flow;

export const setupRendererAndDrawChords = (
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
    notesData,
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
  notesData &&
    notesData.forEach((barData, index) => {
      if (barData) {
        const staveNotes = barData
          // Filter out noteData without keys
          .map(
            (noteData) =>
              new StaveNote({
                keys: ["c/4", "e/4", "g/4", "b/4"], // Now we know keys is not undefined
                duration: "w",
              })
          );

        const keys = staveNotes.map((note) => {
          return note.getKeys();
        });
        if (staveNotes.length > 0) {
          context &&
            Formatter.FormatAndDraw(context, blankStaves[index], staveNotes);
        }
      }
    });
};
