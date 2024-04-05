import { StaveNoteData, ChordNoteData } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteData[],
  userClickX: number
): number => {
  const index: number = staveData?.findIndex((note) => {
    note.staveNoteAbsoluteX &&
      Math.abs(note.staveNoteAbsoluteX - userClickX) <= 10;
  });
  return index;
};

export const indexOfNoteInChordToModify = (
  chordData: ChordNoteData[]
): number => {
  const index: number = chordData?.findIndex((note) => {
    note.userClickY <= 3;
  });
  return index;
};
