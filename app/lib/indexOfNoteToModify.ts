import { StaveNoteAbsoluteXCoordUserClickY } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteAbsoluteXCoordUserClickY[],
  userClickX: number
): number => {
  const index: number = staveData?.findIndex(
    (note) => note.staveNoteAbsoluteX === userClickX
  );
  return index;
};
