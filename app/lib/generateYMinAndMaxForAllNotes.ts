import { NoteStringYMinAndYMax } from "./typesAndInterfaces";

const generateYMinAndYMaxForAllNotes = (
  topNoteYCoordinate: number,
  notes: string[]
): NoteStringYMinAndYMax[] => {
  return notes.map((note, index) => {
    const yCoordinateMin = topNoteYCoordinate + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;

    return { note, yCoordinateMin, yCoordinateMax };
  });
};

export default generateYMinAndYMaxForAllNotes;
