import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { indexOfNoteToModify } from "./indexOfNoteToModify";
import {
  StaveNoteData,
  StaveNoteType,
  NoteStringData,
} from "./typesAndInterfaces";

export const addAccidentalToNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  accidental: string,
  findIndexFunction: (
    barOfStaveNotes: StaveNoteData[],
    userClickX: number
  ) => number
): void => {
  const indexOfNote: number = findIndexFunction(barOfStaveNotes, userClickX);
  if (barOfStaveNotes[indexOfNote]?.newStaveNote) {
    barOfStaveNotes[indexOfNote].newStaveNote.addModifier(
      new Accidental(accidental)
    );
  }
};

export const changeNotePosition = (
  notes: StaveNoteData[],
  x: number,
  noteData: NoteStringData,
  y: number
): void => {
  const savedStaveNoteAbsoluteX =
    notes[indexOfNoteToModify(notes, x)].staveNoteAbsoluteX;
  const newStaveNote: StaveNoteType = new StaveNote({
    keys: [noteData.note],
    duration: "q",
  });

  notes.splice(indexOfNoteToModify(notes, x), 1, {
    newStaveNote,
    staveNoteAbsoluteX: savedStaveNoteAbsoluteX,
    userClickY: y,
  });
};

export const deleteNote = (notes: StaveNoteData[], x: number) => {
  const indexOfNoteToErase = indexOfNoteToModify(notes, x);
  notes.splice(indexOfNoteToErase, 1);
};

export const deleteAccidental = (notes: StaveNoteData[], x: number): void => {
  const indexOfNote = indexOfNoteToModify(notes, x);
  const noteToRedraw = notes[indexOfNote].newStaveNote;
  const savedUserClickY = notes[indexOfNote].userClickY;
  const savedUserClickX = notes[indexOfNote].staveNoteAbsoluteX;
  const noteToString = noteToRedraw.getKeys();
  const redrawnStaveNote: StaveNoteType = new StaveNote({
    keys: noteToString,
    duration: "q",
  });
  notes.splice(indexOfNote, 1, {
    newStaveNote: redrawnStaveNote,
    staveNoteAbsoluteX: savedUserClickX,
    userClickY: savedUserClickY,
  });
};
