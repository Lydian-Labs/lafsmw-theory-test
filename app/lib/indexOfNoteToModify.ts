import { StaveNoteData, ChordNoteData, ChordType } from "./typesAndInterfaces";

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
  chordData: ChordType,
  targetNote: string
): number => {
  const index: number = chordData.keys.findIndex((note) => {
    note === targetNote;
  });
  return index;
};
