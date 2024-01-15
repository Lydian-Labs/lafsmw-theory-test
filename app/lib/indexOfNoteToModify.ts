import {
  NoteStringAndYMinAndYMax,
  StaveNoteAndXAndYCoordinates,
} from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteAndXAndYCoordinates[],
  noteObj: NoteStringAndYMinAndYMax
): number => {
  const index: number = staveData?.findIndex(
    (note) =>
      note.y >= noteObj.yCoordinateMin && note.y <= noteObj.yCoordinateMax
  );
  return index;
};
