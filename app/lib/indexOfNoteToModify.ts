import { StaveNoteAbsoluteXCoordUserClickY } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteAbsoluteXCoordUserClickY[],
  userClickX: number
): number => {
  const index: number = staveData?.findIndex(
    (note) => Math.abs(note.staveNoteAbsoluteX - userClickX) <= 5
  );
  return index;
};
