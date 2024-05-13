import { ScaleData } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  scaleData: ScaleData[],
  userClickX: number
): number => {
  const index: number = scaleData?.findIndex(
    (note) => Math.abs(note.staveNoteAbsoluteX - userClickX) <= 10
  );
  return index;
};
