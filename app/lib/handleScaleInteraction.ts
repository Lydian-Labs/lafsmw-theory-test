import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  changeNotePosition,
  removeAccidentalFromStaveNote,
  addAccidentalToScaleDataKeys,
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
  let updatedBarOfScaleData = [...barOfScaleData];
  let updatedScaleDataMatrix = scaleDataMatrix.map((scaleData) => [
    ...scaleData,
  ]);
  let updatedNotesAndCoordinates = [...notesAndCoordinates];

  if (state.isSharpActive || state.isFlatActive) {
    updatedNotesAndCoordinates = updateNotesAndCoordsWithAccidental(
      state,
      foundNoteData,
      updatedNotesAndCoordinates
    );
    const { updatedNoteObject, noteIndex } = addAccidentalToScaleDataKeys(
      state,
      barOfScaleData,
      userClickX
    );
    updatedBarOfScaleData[noteIndex] = updatedNoteObject;
    updatedBarOfScaleData[noteIndex] = reconstructScale(
      updatedBarOfScaleData[noteIndex]
    );
    updatedScaleDataMatrix[barIndex] = updatedBarOfScaleData;

  } else if (state.isEraseNoteActive) {
    notesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    const { noteDataObject, noteIndex } = removeNoteFromScale(
      barOfScaleData,
      userClickX
    );
    updatedBarOfScaleData[noteIndex] = noteDataObject;
    updatedScaleDataMatrix[barIndex] = updatedBarOfScaleData;
  } else if (state.isEraseAccidentalActive) {
    updatedNotesAndCoordinates = removeAccidentalFromNotesAndCoords(
      notesAndCoordinates,
      foundNoteData
    );
    const { updatedNoteObject, noteIndex } = removeAccidentalFromStaveNote(
      barOfScaleData,
      userClickX
    );

    updatedBarOfScaleData[noteIndex] = updatedNoteObject;
    updatedScaleDataMatrix[barIndex] = updatedBarOfScaleData;
  } else if (state.isChangeNoteActive) {
    console.log(state);
    // updatedScaleData = changeNotePosition(
    //   scaleData,
    //   userClickX,
    //   foundNoteData,
    //   userClickY
    // );
    // updatedScaleDataMatrix[barIndex] = updatedScaleData;
  } else if (barOfScaleData && barOfScaleData.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [foundNoteData.note],
      duration: "q",
    });
    updatedScaleDataMatrix[barIndex] = [
      ...barOfScaleData,
      {
        keys: [foundNoteData.note],
        duration: "q",
        staveNote: newStaveNote,
        staveNoteAbsoluteX: 0,
        userClickY,
      },
    ];
  }
  return {
    scaleDataMatrix: updatedScaleDataMatrix,
    notesAndCoordinates: updatedNotesAndCoordinates,
  };
};
