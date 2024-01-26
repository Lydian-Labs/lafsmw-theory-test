import VexFlow from "vexflow";
import { StaveNoteAbsoluteXCoordUserClickY } from "./typesAndInterfaces";
const VF = VexFlow.Flow;
const { Accidental } = VF;

export const addAccidentalToNote = (
  barOfStaveNotes: StaveNoteAbsoluteXCoordUserClickY[],
  userClickX: number,
  accidental: string,
  findIndexFunction: (
    barOfStaveNotes: StaveNoteAbsoluteXCoordUserClickY[],
    userClickX: number
  ) => number
) => {
  const indexOfNote: number = findIndexFunction(barOfStaveNotes, userClickX);
  if (barOfStaveNotes[indexOfNote]?.newStaveNote) {
    barOfStaveNotes[indexOfNote].newStaveNote.addModifier(
      new Accidental(accidental)
    );
  }
};
