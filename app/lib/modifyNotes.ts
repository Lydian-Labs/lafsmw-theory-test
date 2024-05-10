import VexFlow from "vexflow";
import { indexOfNoteToModify as indexOfNote } from "./indexOfNoteToModify";
import {
  AccidentalType,
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
  return newNotesAndCoordinates;
};

export const addAccidentalToKeys = (
  updatedFoundNoteData: NoteStringData,
  keys: string[],
  state: NoteInteractionState
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  let newKeys = [...keys];
  let foundKey = newKeys.find((key) => key === updatedFoundNoteData.note);
  foundKey = appendAccidentalToNote(accidental, updatedFoundNoteData.note);
  newKeys.splice(
    newKeys.findIndex((key) => key === foundKey),
    1
  );
  return [...newKeys, foundKey];
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
      staveNote: new StaveNote({
        keys: [noteStringData.note],
        duration: "q",
      }),
      keys: [],
      accidental: "",
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
    const { staveNote, userClickY, staveNoteAbsoluteX } =
      noteData.barOfStaveNotes;
    const noteToString = staveNote.getKeys();
    barOfStaveNotes.splice(noteData.noteIndex, 1, {
      staveNote: new StaveNote({
        keys: noteToString,
        duration: "q",
      }),
      keys: staveNote.getKeys(),
      accidental: "",
      staveNoteAbsoluteX,
      userClickY,
    });
  }
};

export const addAccidentalToStaveNote = (
  barOfStaveNotes: StaveNoteData[],
  userClickX: number,
  accidental: string
) => {
  const noteData = getNoteData(barOfStaveNotes, userClickX);
  const { noteIndex } = noteData;

  const newBarOfStaveNotes = barOfStaveNotes.map((noteObject, index) => {
    if (index === noteIndex) {
      noteObject.staveNote.addModifier(new Accidental(accidental));
      return { ...noteObject, accidental };
    }
    return noteObject;
  });
  return newBarOfStaveNotes;
};

export const addStaveNoteToScale = (
  updatedNoteData: NoteStringData,
  duration: string,
  barOfStaveNotes: StaveNoteData[],
  userClickY: number
) => {
  const staveNote: StaveNoteType = new StaveNote({
    keys: [updatedNoteData.note],
    duration: duration,
  });

  return [
    ...barOfStaveNotes,
    {
      keys: [updatedNoteData.note],
      accidental: "",
      staveNote,
      staveNoteAbsoluteX: 0,
      userClickY,
    },
  ];
};

export const addNoteToKeys = (
  keys: string[],
  foundNoteData: NoteStringData
) => {
  let newKeys = [...keys];
  newKeys = [...newKeys, foundNoteData.note];
  return newKeys;
};
