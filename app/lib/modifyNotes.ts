import VexFlow from "vexflow";
import {
  indexOfNoteToModify as indexOfNote,
  indexOfNoteInChordToModify,
} from "./indexOfNoteToModify";
import {
  ChordType,
  ModifyNoteData,
  NoteStringData,
  StaveNoteData,
} from "./typesAndInterfaces";
const { Accidental, StaveNote } = VexFlow.Flow;

const getNoteData = (
  barOfStaveNotes: StaveNoteData[],
  userClick: number
): ModifyNoteData => {
  const noteIndex = indexOfNote(barOfStaveNotes, userClick);
  return { barOfStaveNotes: barOfStaveNotes[noteIndex], noteIndex };
};
const getChordNoteData = (chordData: ChordType, userClick: number) => {
  const noteIndex = indexOfNoteInChordToModify(chordData);
  return { chordData: chordData[noteIndex], noteIndex };
};
export const addAccidentalToNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  accidental: string
): void => {
  const noteData = getNoteData(barOfStaveNotes, userClickX);
  noteData.barOfStaveNotes &&
    noteData.barOfStaveNotes.newStaveNote.addModifier(
      new Accidental(accidental)
    );
};
export const addAccidentalToNoteInChord = (
  barOfStaveNotes: ChordType,
  userClickY: number,
  accidental: string
): void => {
  const noteData = getChordNoteData(barOfStaveNotes, userClickY);
  noteData.chordData.staveNotes &&
    noteData.chordData.staveNotes.addModifier(new Accidental(accidental));
};

export const changeNotePosition = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  noteStringData: NoteStringData,
  userClickY: number
): void => {
  const noteData = getNoteData(barOfStaveNotes, userClickX);
  const staveNoteAbsoluteX = noteData.barOfStaveNotes
    ? noteData.barOfStaveNotes.staveNoteAbsoluteX
    : null;
  staveNoteAbsoluteX &&
    barOfStaveNotes.splice(noteData.noteIndex, 1, {
      newStaveNote: new StaveNote({
        keys: [noteStringData.note],
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
  const noteData = getNoteData(barOfStaveNotes, userClickX);
  //!= checks for both null and undefined
  if (noteData.noteIndex != null) {
    barOfStaveNotes.splice(noteData.noteIndex, 1);
  }
};

export const deleteAccidental = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number
): void => {
  const noteData = getNoteData(barOfStaveNotes, userClickX);
  if (noteData.noteIndex != null && noteData.barOfStaveNotes != null) {
    const { newStaveNote, userClickY, staveNoteAbsoluteX } =
      noteData.barOfStaveNotes;
    const noteToString = newStaveNote.getKeys();
    barOfStaveNotes.splice(noteData.noteIndex, 1, {
      newStaveNote: new StaveNote({
        keys: noteToString,
        duration: "q",
      }),
      staveNoteAbsoluteX,
      userClickY,
    });
  }
};
