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
  scaleData: ScaleData,
  updatedKeys?: string[]
) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : scaleData.keys,
    duration: scaleData.duration,
  });
};

export const getNoteData = (
  barOfScaleData: ScaleData[],
  userClickX: number
): ModifyScaleData => {
  const noteIndex = indexOfNote(barOfScaleData, userClickX);
  return { noteDataObject: barOfScaleData[noteIndex], noteIndex };
};

const addAccidentalsToStaveNotes = (
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

export const addAccidentalToScaleDataKeys = (
  state: NoteInteractionState,
  scaleData: ScaleData[],
  userClickX: number
) => {
  const { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);

  const accidental = state.isSharpActive ? "#" : "b";

  const newStaveNote = createStaveNoteFromScaleData(noteDataObject);

  addAccidentalsToStaveNotes(noteDataObject.keys, newStaveNote);

  const updatedNoteObject = {
    ...noteDataObject,
    staveNotes: newStaveNote,
    keys: [appendAccidentalToNote(accidental, noteDataObject.keys[0])], //should this be noteIndex?
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
  scaleData: ScaleData,
  foundNoteData: NotesAndCoordinatesData
) => {
   
  const updatedKeys = [foundNoteData.note];
  const newNote = createStaveNoteFromScaleData(scaleData, updatedKeys);

  addAccidentalsToStaveNotes(updatedKeys, newNote);

  const newNoteObject = {
    ...scaleData,
    keys: updatedKeys,
    staveNote: newNote,
  };
  return newNoteObject;
};

export const reconstructScale = (scaleData: ScaleData) => {
  const newStaveNote = createStaveNoteFromScaleData(scaleData);
  addAccidentalsToStaveNotes(scaleData.keys, newStaveNote);

  return {
    ...scaleData,
    staveNotes: newStaveNote,
  };
};

export const changeNotePosition = (
  scaleData: ScaleData[],
  userClickX: number,
  foundNoteData: NotesAndCoordinatesData,
  userClickY: number
): ScaleData => {
  const { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);

  const staveNoteAbsoluteX = noteDataObject.staveNoteAbsoluteX;

  const newStaveNote = createStaveNoteFromScaleData(noteDataObject, [
    foundNoteData.note,
  ]);
  const updatedNoteObject = {
    ...noteDataObject,
    staveNotes: newStaveNote,
    keys: [foundNoteData.note],
    staveNoteAbsoluteX,
    userClickY,
  };
  return updatedNoteObject;
};

export const removeNoteFromScale = (
  scaleData: ScaleData[],
  userClickX: number
) => {
  const { noteDataObject, noteIndex } = getNoteData(scaleData, userClickX);
  //!= checks for both null and undefined
  if (noteIndex != null) {
    scaleData.splice(noteIndex, 1);
  }
  return { noteDataObject, noteIndex };
};
