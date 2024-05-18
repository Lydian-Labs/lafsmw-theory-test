import VexFlow from "vexflow";
import {
  changeNotePosition,
  removeAccidentalFromStaveNote,
  addAccidentalToStaveNoteAndKeys,
  removeNoteFromScale,
} from "./modifyScales";
import {
  updateNotesAndCoordsWithAccidental,
  removeAccidentalFromNotesAndCoords,
} from "./modifyNotesAndCoordinates";
import {
  NoteInteractionAction,
  NoteInteractionState,
  ScaleData,
  NotesAndCoordinatesData,
  StaveNoteType,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const HandleScaleInteraction = (
  foundNoteData: NotesAndCoordinatesData,
  checkBeatsInMeasure: React.Dispatch<NoteInteractionAction>,
  notesAndCoordinates: NotesAndCoordinatesData[],
  beatsInMeasureAction: string,
  barOfScaleData: ScaleData[],
  scaleDataMatrix: ScaleData[][],
  state: NoteInteractionState,
  userClickX: number,
  userClickY: number,
  barIndex: number
) => {
  if (state.isSharpActive || state.isFlatActive) {
    notesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    console.log("add accidental to note and coords", notesAndCoordinates);
    const { updatedNoteObject, noteIndex } = addAccidentalToStaveNoteAndKeys(
      state,
      barOfScaleData,
      userClickX
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
      userClickX
    );
    console.log("remove accidental from note and coords", notesAndCoordinates);
    barOfScaleData[noteIndex] = updatedNoteObject;
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (state.isEraseNoteActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    console.log("remove accidental from note and coords", notesAndCoordinates);
    removeNoteFromScale(barOfScaleData, userClickX);
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (state.isChangeNoteActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    console.log("remove accidental from note and coords", notesAndCoordinates);
    changeNotePosition(barOfScaleData, userClickX, foundNoteData, userClickY);
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [foundNoteData.note],
      duration: "q",
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
