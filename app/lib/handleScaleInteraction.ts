import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  changeNotePosition,
  removeAccidentalFromStaveNote,
  addAccidentalToStaveNoteAndKeys,
  addNewNoteToScale,
  removeNoteFromScale,
  reconstructScale,
  getNoteData,
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
import { addAccidentalsToStaveNotes } from "./modifyScales";
const { StaveNote } = VexFlow.Flow;

export const handleScaleInteraction = (
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

    const { updatedNoteObject, noteIndex } = addAccidentalToStaveNoteAndKeys(
      state,
      barOfScaleData,
      userClickX
    );

    barOfScaleData[noteIndex] = updatedNoteObject;

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
