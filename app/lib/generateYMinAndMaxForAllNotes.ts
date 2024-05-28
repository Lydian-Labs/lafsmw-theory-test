import { NotesAndCoordinatesData } from "./typesAndInterfaces";
const generateYMinAndYMaxForNotes = (
  topNoteYCoordinate: number,
  notes: string[]
): NotesAndCoordinatesData[] => {
  return notes.map((note, index) => {
    const originalNote = note;
    const yCoordinateMin = topNoteYCoordinate + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;

    return { originalNote, note, yCoordinateMin, yCoordinateMax };
  });
};

export default generateYMinAndYMaxForNotes;
