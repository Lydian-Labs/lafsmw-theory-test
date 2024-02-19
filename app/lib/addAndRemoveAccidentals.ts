import VexFlow from "vexflow";
import { StaveNoteData } from "./typesAndInterfaces";
const VF = VexFlow.Flow;
const { Accidental } = VF;

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

export const indexOfNoteWithAccidental = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  findIndexFunction: (
    barOfStaveNotes: StaveNoteData[],
    userClickX: number
  ) => number
) => {
  const indexOfNote: number = findIndexFunction(barOfStaveNotes, userClickX);
  if (barOfStaveNotes[indexOfNote]?.newStaveNote) {
    return indexOfNote;
  }
};
