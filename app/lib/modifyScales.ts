import VexFlow from "vexflow";
import { indexOfNoteToModify as indexOfNote } from "./indexOfNoteToModify";
import {
  ModifyScaleData,
  NotesAndCoordinatesData,
  ScaleData,
  StaveNoteType,
} from "./typesAndInterfaces";
import { NoteInteractionState } from "./typesAndInterfaces";
import {
  getAccidentalType,
  parseNote,
  appendAccidentalToNote,
  removeAccidentals,
} from "./modifyNotesAndCoordinates";
const { Accidental, StaveNote } = VexFlow.Flow;

export const createStaveNoteFromScaleData = (
  noteObject: ScaleData,
  chosenClef: string,
  updatedKeys?: string[]
) => {
  const newStaveNote = new StaveNote({
    keys: updatedKeys ? updatedKeys : noteObject.keys,
    duration: "q",
    clef: chosenClef,
  });

  return newStaveNote;
};

export const getNoteData = (
  barOfScaleData: ScaleData[],
  userClickX: number
): ModifyScaleData | null => {
  const noteIndex = indexOfNote(barOfScaleData, userClickX);
  if (noteIndex === -1) {
    return null;
  }
  return { noteDataObject: barOfScaleData[noteIndex], noteIndex };
};

export const addAccidentalsToStaveNotes = (
  keys: string[],
  newStaveNote: StaveNoteType
) => {
  keys.forEach((key) => {
    const { noteBase } = parseNote(key);
    const accidentalType = getAccidentalType(noteBase);

    if (accidentalType) {
      newStaveNote.addModifier(new Accidental(accidentalType));
    }
  });
};

export const reconstructScale = (
  noteObject: ScaleData,
  foundNoteData: NotesAndCoordinatesData,
  chosenClef: string
) => {
  const newStaveNote = createStaveNoteFromScaleData(noteObject, chosenClef);
  addAccidentalsToStaveNotes([foundNoteData.note], newStaveNote);
  const newScale = {
    ...noteObject,
    staveNote: newStaveNote,
  };
  return newScale;
};

export const addAccidentalToStaveNoteAndKeys = (
  state: NoteInteractionState,
  scaleData: ScaleData[],
  userClickX: number,
  chosenClef: string
) => {
  const noteData = getNoteData(scaleData, userClickX);
  if (!noteData) return; // Return early if no valid note is found
  let { noteDataObject, noteIndex } = noteData;
  const accidental = state.isSharpActive ? "#" : "b";
  noteDataObject.keys[0] = appendAccidentalToNote(
    accidental,
    noteDataObject.keys[0]
  );
  const newStaveNote = createStaveNoteFromScaleData(noteDataObject, chosenClef);
  addAccidentalsToStaveNotes(noteDataObject.keys, newStaveNote);
  const updatedNoteObject = {
    ...noteDataObject,
    staveNote: newStaveNote,
    keys: noteDataObject.keys,
  };
  return { updatedNoteObject, noteIndex };
};

export const removeAccidentalFromStaveNote = (
  scaleData: ScaleData[],
  userClickX: number,
  chosenClef: string
) => {
  const noteData = getNoteData(scaleData, userClickX);
  if (!noteData) return; // Return early if no valid note is foun
  const { noteDataObject, noteIndex } = noteData;

  let { keys } = noteDataObject;

  const updatedNoteObject = {
    ...noteDataObject,
    keys: [removeAccidentals(keys[0])],
    staveNote: createStaveNoteFromScaleData(noteDataObject, chosenClef),
  };
  return { updatedNoteObject, noteIndex };
};

export const addNewNoteToScale = (
  scaleData: ScaleData[],
  foundNoteData: NotesAndCoordinatesData,
  userClickX: number,
  userClickY: number,
  chosenClef: string
) => {
  const noteData = getNoteData(scaleData, userClickX);
  if (!noteData) return; // Return early if no valid note is foun
  let { noteDataObject } = noteData;
  const newNote = createStaveNoteFromScaleData(noteDataObject, chosenClef, [
    foundNoteData.note,
  ]);
  addAccidentalsToStaveNotes(noteDataObject.keys, newNote);
  const newNoteObject = {
    keys: [foundNoteData.note],
    duration: "q",
    staveNote: newNote,
    staveNoteAbsoluteX: 0,
    userClickY,
  };
  return newNoteObject;
};

export const changeNotePosition = (
  scaleData: ScaleData[],
  userClickX: number,
  foundNoteData: NotesAndCoordinatesData,
  userClickY: number,
  chosenClef: string
) => {
  const noteData = getNoteData(scaleData, userClickX);
  if (!noteData) return; // Return early if no valid note is foun
  const { noteDataObject, noteIndex } = noteData;
  if (noteDataObject && noteDataObject.staveNote) {
    const staveNoteAbsoluteX = noteDataObject.staveNote.getAbsoluteX();

    scaleData.splice(noteIndex, 1, {
      staveNote: new StaveNote({
        keys: [foundNoteData.note],
        duration: "q",
        clef: chosenClef,
      }),
      keys: [foundNoteData.note],
      duration: "q",
      staveNoteAbsoluteX,
      userClickY,
    });
  }
};

export const removeNoteFromScale = (
  scaleData: ScaleData[],
  userClickX: number
) => {
  const noteData = getNoteData(scaleData, userClickX);
  if (!noteData) return; // Return early if no valid note is foun
  const { noteIndex } = noteData;
  //!= checks for both null and undefined
  if (noteIndex != null) {
    scaleData.splice(noteIndex, 1);
  }
};
