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
  updatedKeys?: string[]
) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : noteObject.keys,
    duration: "q",
  });
};

export const getNoteData = (
  barOfScaleData: ScaleData[],
  userClickX: number
): ModifyScaleData => {
  const noteIndex = indexOfNote(barOfScaleData, userClickX);
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
  foundNoteData: NotesAndCoordinatesData
) => {
  const newStaveNote = createStaveNoteFromScaleData(noteObject);
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
  userClickX: number
) => {
  let { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);
  const accidental = state.isSharpActive ? "#" : "b";
  noteDataObject.keys[0] = appendAccidentalToNote(
    accidental,
    noteDataObject.keys[0]
  );
  const newStaveNote = createStaveNoteFromScaleData(noteDataObject);
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
  userClickX: number
) => {
  const { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);

  let { keys } = noteDataObject;

  const updatedNoteObject = {
    ...noteDataObject,
    keys: [removeAccidentals(keys[0])],
    staveNote: createStaveNoteFromScaleData(noteDataObject),
  };
  return { updatedNoteObject, noteIndex };
};

export const addNewNoteToScale = (
  scaleData: ScaleData[],
  foundNoteData: NotesAndCoordinatesData,
  userClickX: number,
  userClickY: number
) => {
  let { noteDataObject } = getNoteData(scaleData, userClickX);
  const newNote = createStaveNoteFromScaleData(noteDataObject, [
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
  userClickY: number
) => {
  const { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);
  if (noteDataObject.staveNote) {
    const staveNoteAbsoluteX = noteDataObject.staveNote.getAbsoluteX();

    scaleData.splice(noteIndex, 1, {
      staveNote: new StaveNote({
        keys: [foundNoteData.note],
        duration: "q",
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
  const { noteIndex } = getNoteData(scaleData, userClickX);
  //!= checks for both null and undefined
  if (noteIndex != null) {
    scaleData.splice(noteIndex, 1);
  }
};
