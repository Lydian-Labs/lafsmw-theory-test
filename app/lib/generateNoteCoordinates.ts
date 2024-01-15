import { NoteStringAndNoteCoordinate } from "./typesAndInterfaces";

const generateNoteCoordinates = (
  yMin: number,
  notes: string[]
): NoteStringAndNoteCoordinate[] => {
  return notes.map((note, index) => {
    const yCoordinateMin = yMin + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;

    return { note, yCoordinateMin, yCoordinateMax };
  });
};

export default generateNoteCoordinates;
