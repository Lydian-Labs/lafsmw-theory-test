import { NotesAndCoordinatesData } from "./typesAndInterfaces";
import { TOLERANCE } from "./data/stavesData";
const generateYMinAndYMaxForAllNotes = (
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

export default generateYMinAndYMaxForAllNotes;
