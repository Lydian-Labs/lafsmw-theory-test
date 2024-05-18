import { NoteStringData } from "./typesAndInterfaces";

const generateYMinAndYMaxForAllNotes = (
  topNoteYCoordinate: number,
  notes: string[]
): NoteStringData[] => {
  return notes.map((note, index) => {
    const originalNote = note;
    const yCoordinateMin = topNoteYCoordinate + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;

    return { originalNote, note, yCoordinateMin, yCoordinateMax };
  });
};

export default generateYMinAndYMaxForAllNotes;
