import { ChordInteractionState, NoteStringData } from "./typesAndInterfaces";
import {
  appendAccidentalToNote,
  removeAccidentalFromNote,
} from "./modifyAccidentals";

export const updateNotesWithAccidental = (
  state: ChordInteractionState,
  foundNoteData: NoteStringData,
  notesAndCoordinates: NoteStringData[]
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

export const eraseAccidentalFromNotes = (
  notesAndCoordinates: NoteStringData[],
  foundNoteData: NoteStringData
) => {
  const notesAndCoordinatesCopy = [...notesAndCoordinates];
  foundNoteData.note = removeAccidentalFromNote(foundNoteData.note);
  return notesAndCoordinatesCopy.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
};
