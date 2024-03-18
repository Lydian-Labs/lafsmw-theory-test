import { StaveNoteData } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteData[],
  userClickX: number
): number => {
  const index: number = staveData?.findIndex(
    (note) => Math.abs(note.staveNoteAbsoluteX - userClickX) <= 10
  );
  return index;
};
