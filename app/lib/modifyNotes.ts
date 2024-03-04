import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { indexOfNoteToModify as indexOfNote } from "./indexOfNoteToModify";
import { StaveNoteData, NoteStringData } from "./typesAndInterfaces";

const getNoteIndex = (notes: StaveNoteData[], x: number): number =>
  indexOfNote(notes, x);

export const addAccidentalToNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  accidental: string
): void => {
  const indexOfNote: number = getNoteIndex(barOfStaveNotes, userClickX);
  barOfStaveNotes[indexOfNote]?.newStaveNote &&
    barOfStaveNotes[indexOfNote].newStaveNote.addModifier(
      new Accidental(accidental)
    );
};

export const changeNotePosition = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  noteData: NoteStringData,
  userClickY: number
): void => {
  const indexOfNote: number = getNoteIndex(barOfStaveNotes, userClickX);
  const staveNoteAbsoluteX = barOfStaveNotes[indexOfNote]
    ? barOfStaveNotes[indexOfNote].staveNoteAbsoluteX
    : null;
  staveNoteAbsoluteX &&
    barOfStaveNotes.splice(indexOfNote, 1, {
      newStaveNote: new StaveNote({
        keys: [noteData.note],
        duration: "q",
      }),
      staveNoteAbsoluteX,
      userClickY,
    });
};

export const deleteNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number
): void => {
  const indexOfNote = getNoteIndex(barOfStaveNotes, userClickX);
  indexOfNote ? barOfStaveNotes.splice(indexOfNote, 1) : null;
};

export const deleteAccidental = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number
): void => {
  const indexOfNote = getNoteIndex(barOfStaveNotes, userClickX);
  const { newStaveNote, userClickY, staveNoteAbsoluteX } =
    barOfStaveNotes[indexOfNote];
  const noteToString = newStaveNote.getKeys();
  barOfStaveNotes.splice(indexOfNote, 1, {
    newStaveNote: new StaveNote({
      keys: noteToString,
      duration: "q",
    }),
    staveNoteAbsoluteX,
    userClickY,
  });
};
