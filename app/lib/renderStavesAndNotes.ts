import VexFlow from "vexflow";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
const { Formatter } = VexFlow.Flow;
import {
  RendererRef,
  SetStaves,
  NoteData,
  BlankStaves,
} from "./typesAndInterfaces";

export const renderStavesAndNotes = (
  rendererRef: RendererRef,
  font: string,
  fontSize: number,
  numStaves: number,
  rendererWidth: number,
  rendererHeight: number,
  yPositionOfStaves: number,
  xPositionOfStaves: number,
  clef: string,
  timeSig: string,
  firstStaveWidth: number,
  regularStaveWidth: number,
  setStaves: SetStaves,
  notesData: NoteData,
  blankStaves: BlankStaves
): void => {
  const renderer = rendererRef.current;
  renderer?.resize(rendererWidth, rendererHeight);
  const context = renderer && renderer.getContext();
  context?.setFont(font, fontSize);
  context?.clear();
  if (context) {
    context &&
      setStaves(() =>
        KaseyBlankStaves(
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
