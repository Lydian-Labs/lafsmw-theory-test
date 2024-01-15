//move to lib folder

interface NoteStringAndYMinAndYMax {
  note: string;
  yCoordinateMin: number;
  yCoordinateMax: number;
}

const generateNoteCoordinates = (
  yMin: number,
  notes: string[]
): NoteStringAndYMinAndYMax[] => {
  return notes.map((note, index) => {
    const yCoordinateMin = yMin + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;
    return { note, yCoordinateMin, yCoordinateMax };
  });
};

export default generateNoteCoordinates;
