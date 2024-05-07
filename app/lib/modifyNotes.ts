import VexFlow from "vexflow";
import { indexOfNoteToModify as indexOfNote } from "./indexOfNoteToModify";
import {
  ModifyNoteData,
  NoteStringData,
  StaveNoteData,
  StaveNoteType,
} from "./typesAndInterfaces";
import { NoteInteractionState } from "./typesAndInterfaces";
const { Accidental, StaveNote } = VexFlow.Flow;

const getNoteData = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number
): ModifyNoteData => {
  const noteIndex = indexOfNote(barOfStaveNotes, userClickX);
  return { barOfStaveNotes: barOfStaveNotes[noteIndex], noteIndex };
};

const parseNote = (note: string) => {
  const noteBase = note.split("/")[0];
  const octave = note.split("/")[1];
  return { noteBase, octave };
};

const appendAccidentalToNote = (accidental: string, note: string) => {
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

export const updateNoteWithAccidental = (
  state: NoteInteractionState,
  foundNoteData: NoteStringData,
  notesAndCoordinates: NoteStringData[]
) => {
  let newNotesAndCoordinates = [...notesAndCoordinates];
  const accidental = state.isSharpActive ? "#" : "b";
  newNotesAndCoordinates = notesAndCoordinates.map((noteData) => {
    if (noteData.note === foundNoteData.note)
      return {
        ...noteData,
        note: appendAccidentalToNote(accidental, foundNoteData.note),
      };
    else {
      return noteData;
    }
  });
  console.log(newNotesAndCoordinates);
  return newNotesAndCoordinates;
};

export const addAccidentalToStaveNote = (
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

export const removeAccidentalFromNote = (
  notesAndCoordinates: NoteStringData[],
  foundNoteData: NoteStringData
) => {
  const newNotesAndCoordinates = notesAndCoordinates.map((noteData) => {
    if (noteData.note === foundNoteData.note) {
      return {
        ...noteData,
        note: removeAccidentals(foundNoteData.note),
      };
    } else {
      return noteData;
    }
  });
  return newNotesAndCoordinates;
};

export const removeAccidentalFromStaveNote = (
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

const getAccidentalType = (noteBase: string) => {
  if (noteBase.endsWith("##")) return "##";
  if (noteBase.endsWith("bb") && noteBase.length > 2) return "bb";
  if (noteBase.endsWith("#")) return "#";
  if (noteBase.endsWith("b") && noteBase.length > 1) return "b";
  return null;
};

export const addStaveNoteToScale = (
  updatedNoteData: NoteStringData,
  duration: string,
  barOfStaveNotes: StaveNoteData[],
  userClickY: number
) => {
  const newStaveNote: StaveNoteType = new StaveNote({
    keys: [updatedNoteData.note],
    duration: duration,
  });
  return [
    ...barOfStaveNotes,
    {
      keys: [updatedNoteData.note],
      newStaveNote,
      staveNoteAbsoluteX: 0,
      userClickY,
    },
  ];
};
