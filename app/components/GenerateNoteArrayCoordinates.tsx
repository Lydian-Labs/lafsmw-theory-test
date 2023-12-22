interface NoteCoordinate {
  note: string;
  yCoordinateMin: number;
  yCoordinateMax: number;
}

const GenerateNoteArrayCoordinates = (
  yMin: number,
  notes: string[]
): NoteCoordinate[] => {
  return notes.map((note, index) => {
    const yCoordinateMin = yMin + index * 5;
    const yCoordinateMax = yCoordinateMin + 5;
    return { note, yCoordinateMin, yCoordinateMax };
  });
};

export default GenerateNoteArrayCoordinates;
