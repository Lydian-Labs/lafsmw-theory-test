import { ScaleData, StaveNoteData } from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  scaleData: ScaleData[] | StaveNoteData[],
  userClickX: number
): number => {
  const index: number = scaleData?.findIndex(
    (note) => Math.abs(note.staveNoteAbsoluteX - userClickX) <= 10
  );
  return index !== -1 ? index : -1;
};
