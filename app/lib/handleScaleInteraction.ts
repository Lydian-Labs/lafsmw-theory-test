import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
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
  NoteInteractionAction,
  NoteInteractionState,
  NotesAndCoordinatesData,
  ScaleData,
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
  barIndex: number,
  clef: string
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
      userClickX,
      clef
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
      clef
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
    changeNotePosition(
      barOfScaleData,
      userClickX,
      foundNoteData,
      userClickY,
      clef
    );
    scaleDataMatrix[barIndex] = barOfScaleData;
  } else if (barOfScaleData && barOfScaleData.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [foundNoteData.note],
      duration: "q",
      clef,
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
