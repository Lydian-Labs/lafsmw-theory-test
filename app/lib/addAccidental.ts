import VexFlow from "vexflow";
import { StaveNoteData } from "./typesAndInterfaces";
const { Accidental } = VexFlow.Flow;

export const addAccidentalToNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  accidental: string,
  findIndexFunction: (
    barOfStaveNotes: StaveNoteData[],
    userClickX: number
  ) => number
): void => {
  const indexOfNote: number = findIndexFunction(barOfStaveNotes, userClickX);
  if (barOfStaveNotes[indexOfNote]?.newStaveNote) {
    barOfStaveNotes[indexOfNote].newStaveNote.addModifier(
      new Accidental(accidental)
    );
  }
};
