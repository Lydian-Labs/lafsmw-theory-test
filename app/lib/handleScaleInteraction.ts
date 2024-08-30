import VexFlow from "vexflow";

import {
  removeAccidentalFromNotesAndCoords,
  updateNotesAndCoordsWithAccidental,
} from "./modifyNotesAndCoordinates";
import {
  addAccidentalToStaveNoteAndKeys,
  changeNotePosition,
  removeAccidentalFromStaveNote,
  removeNoteFromScale,
} from "./modifyScales";
import {
  NoteInteractionState,
  NotesAndCoordinatesData,
  ScaleData,
  StaveNoteType,
  errorMessages,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const HandleScaleInteraction = (
  foundNoteData: NotesAndCoordinatesData,
  notesAndCoordinates: NotesAndCoordinatesData[],
  barOfScaleData: ScaleData[],
  scaleDataMatrix: ScaleData[][],
  state: NoteInteractionState,
  userClickX: number,
  userClickY: number,
  barIndex: number,
  chosenClef: string,
  setMessage: (newState: React.SetStateAction<string>) => void,
  setOpen: (newState: React.SetStateAction<boolean>) => void,
  errorMessages: errorMessages
) => {
  const scaleLength = scaleDataMatrix[0].length;
  if (state.isSharpActive || state.isFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    const { updatedNoteObject, noteIndex } = addAccidentalToStaveNoteAndKeys(
      state,
      barOfScaleData,
      userClickX,
      chosenClef
    );
    barOfScaleData[noteIndex] = updatedNoteObject;
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (state.isEraseAccidentalActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    const { updatedNoteObject, noteIndex } = removeAccidentalFromStaveNote(
      barOfScaleData,
      userClickX,
      chosenClef
    );
    barOfScaleData[noteIndex] = updatedNoteObject;
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (state.isEraseNoteActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    removeNoteFromScale(barOfScaleData, userClickX);
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (state.isChangeNoteActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    changeNotePosition(
      barOfScaleData,
      userClickX,
      foundNoteData,
      userClickY,
      chosenClef
    );
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (scaleLength >= 7) {
    setOpen(true);
    setMessage(errorMessages.tooManyNotesInMeasure);
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [foundNoteData.note],
      duration: "q",
      clef: chosenClef,
    });
    let newNoteObject = [
      ...barOfScaleData,
      {
        keys: [foundNoteData.note],
        duration: "q",
        staveNote: newStaveNote,
        staveNoteAbsoluteX: 0,
        userClickY,
      },
    ];

    scaleDataMatrix[barIndex] = newNoteObject;
  }
  return {
    scaleDataMatrix,
    notesAndCoordinates,
  };
};
