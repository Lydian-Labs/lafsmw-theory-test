import { NoteInteractionState,  NotesAndCoordinatesData } from "./typesAndInterfaces";


export const parseNote = (note: string) => {
  const noteBase = note.split("/")[0];
  const octave = note.split("/")[1];
  return { noteBase, octave };
};


export const updateNotesAndCoordsWithAccidental = (
  state: NoteInteractionState,
  foundNoteData: NotesAndCoordinatesData,
  notesAndCoordinates: NotesAndCoordinatesData[]
) => {
  const notesAndCoordinatesCopy = [...notesAndCoordinates];
  const accidental = state.isSharpActive ? "#" : "b";
  foundNoteData.note = appendAccidentalToNote(accidental, foundNoteData.note);
  return notesAndCoordinatesCopy.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
};

export const removeAccidentals = (note: string) => {
  let { noteBase, octave } = parseNote(note);
  if (noteBase.length > 2) {
    if (noteBase.endsWith("##")) {
      noteBase = noteBase.replace("##", "");
    } else if (noteBase.endsWith("bb")) {
      noteBase = noteBase.replace("bb", "");
    }
  } else if (noteBase.length > 1) {
    if (noteBase.endsWith("b")) {
      noteBase = noteBase.replace("b", "");
    } else if (noteBase.endsWith("#")) {
      noteBase = noteBase.replace("#", "");
    }
  }
  return `${noteBase}/${octave}`;
};

export const getAccidentalType = (noteBase: string) => {
  if (noteBase.endsWith("##")) return "##";
  if (noteBase.endsWith("bb") && noteBase.length > 2) return "bb";
  if (noteBase.endsWith("#")) return "#";
  if (noteBase.endsWith("b") && noteBase.length > 1) return "b";
  return null;
};

export const appendAccidentalToNote = (accidental: string, note: string) => {
  const { noteBase, octave } = parseNote(note);
  if (
    (accidental === "#" && noteBase.length > 1 && noteBase.endsWith("b")) ||
    (accidental === "b" && noteBase.endsWith("#"))
  ) {
    console.log("Cannot add contradictory accidentals to the same note.");
    return note;
  }
  if (noteBase.length < 3) {
    return `${noteBase}${accidental}/${octave}`;
  }
  return `${noteBase}/${octave}`;
};

export const removeAccidentalFromNotesAndCoords = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  foundNoteData: NotesAndCoordinatesData
) => {
  foundNoteData.note = removeAccidentals(foundNoteData.note);
  return notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
};