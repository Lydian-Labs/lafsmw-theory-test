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
  barOfNoteObjects: StaveNoteData[],
  userClickX: number
): ModifyNoteData => {
  const noteIndex = indexOfNote(barOfNoteObjects, userClickX);
  return { barOfNoteObjects: barOfNoteObjects[noteIndex], noteIndex };
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
  barOfNoteObjects: StaveNoteData[],
  userClickX: number,
  noteStringData: NoteStringData,
  userClickY: number
): void => {
  const noteData = getNoteData(barOfNoteObjects, userClickX);
  const staveNoteAbsoluteX = noteData.barOfNoteObjects
    ? noteData.barOfNoteObjects.staveNoteAbsoluteX
    : null;

  staveNoteAbsoluteX &&
    barOfNoteObjects.splice(noteData.noteIndex, 1, {
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
  barOfNoteObjects: StaveNoteData[],
  userClickX: number
): void => {
  const noteData = getNoteData(barOfNoteObjects, userClickX);
  //!= checks for both null and undefined
  if (noteData.noteIndex != null) {
    barOfNoteObjects.splice(noteData.noteIndex, 1);
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
  barOfNoteDataObjects: StaveNoteData[],
  userClickX: number
): void => {
  const { barOfNoteObjects, noteIndex } = getNoteData(
    barOfNoteDataObjects,
    userClickX
  );
  const { staveNote, userClickY, staveNoteAbsoluteX } = barOfNoteObjects;
  barOfNoteDataObjects.splice(noteIndex, 1, {
    staveNote: new StaveNote({
      keys: staveNote.getKeys(),
      duration: "q",
    }),
    keys: staveNote.getKeys(),
    accidental: "",
    staveNoteAbsoluteX,
    userClickY,
  });
};

export const addAccidentalToStaveNote = (
  barOfNoteDataObjects: StaveNoteData[],
  userClickX: number,
  accidental: string
) => {
  const { barOfNoteObjects, noteIndex } = getNoteData(
    barOfNoteDataObjects,
    userClickX
  );
  return barOfNoteDataObjects.map((noteObject, index) => {
    if (index === noteIndex) {
      noteObject.staveNote.addModifier(new Accidental(accidental));
      return {
        ...noteObject,
        accidental,
        keys: [appendAccidentalToNote(accidental, barOfNoteObjects.keys[0])],
      };
    }
    return noteObject;
  });
};

export const addStaveNoteToScale = (
  updatedNoteData: NoteStringData,
  duration: string,
  barOfNoteObjects: StaveNoteData[],
  userClickY: number
) => {
  return [
    ...barOfNoteObjects,
    {
      keys: [updatedNoteData.note],
      accidental: "",
      staveNote: new StaveNote({
        keys: [updatedNoteData.note],
        duration: duration,
      }),

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
