import {
  NoteStringAndYMinAndYMax,
  StaveNoteAndUserClickXAndYCoords,
} from "./typesAndInterfaces";

export const indexOfNoteToModify = (
  staveData: StaveNoteAndUserClickXAndYCoords[],
  noteObj: NoteStringAndYMinAndYMax
): number => {
  const index: number = staveData?.findIndex(
    (note) =>
      note.userClickY >= noteObj.yCoordinateMin &&
      note.userClickY <= noteObj.yCoordinateMax
  );
  return index;
};
