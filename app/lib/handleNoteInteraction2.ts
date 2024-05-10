import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToStaveNote,
  addAccidentalToKeys,
  addNoteToKeys,
  changeNotePosition,
  removeAccidentalFromStaveNote,
  deleteNote,
  updateNoteWithAccidental,
  removeAccidentalFromNote,
  addStaveNoteToScale,
} from "./modifyNotes";
import {
  NoteInteractionAction,
  NoteInteractionState,
  NoteStringData,
  StaveNoteData,
  FoundNoteData,
} from "./typesAndInterfaces";

export const handleNoteInteraction = (
  updatedNoteData: NoteStringData,
  noteNotFound: React.Dispatch<NoteInteractionAction>,
  checkBeatsInMeasure: React.Dispatch<NoteInteractionAction>,
  beatsInMeasureAction: string,
  noNoteFoundAction: string,
  barOfStaveNotes: StaveNoteData[],
  notesAndCoordinates: FoundNoteData[],
  keys: string[],
  foundNoteData: FoundNoteData,
  staveNotesData: StaveNoteData[][],
  state: NoteInteractionState,
  userClickX: number,
  userClickY: number,
  barIndex: number
) => {
  if (!updatedNoteData) {
    noteNotFound({ type: noNoteFoundAction });
  } else if (state.isSharpActive || state.isFlatActive) {
    const updatedBarOfStaveNotes = addAccidentalToStaveNote(
      barOfStaveNotes,
      userClickX,
      state.isSharpActive ? "#" : "b"
    );
    notesAndCoordinates = updateNoteWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    staveNotesData[barIndex] = updatedBarOfStaveNotes;
  } else if (state.isEraseNoteActive) {
    deleteNote(barOfStaveNotes, userClickX);
    notesAndCoordinates = removeAccidentalFromNote(
      notesAndCoordinates,
      foundNoteData
    );
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (state.isEraseAccidentalActive) {
    removeAccidentalFromStaveNote(barOfStaveNotes, userClickX, foundNoteData);
    notesAndCoordinates = removeAccidentalFromNote(
      notesAndCoordinates,
      foundNoteData
    );
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (state.isChangeNoteActive) {
    changeNotePosition(
      barOfStaveNotes,
      userClickX,
      updatedNoteData,
      userClickY
    );
    notesAndCoordinates = removeAccidentalFromNote(
      notesAndCoordinates,
      foundNoteData
    );
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    keys = addNoteToKeys(keys, foundNoteData);

    staveNotesData[barIndex] = addStaveNoteToScale(
      updatedNoteData,
      "q",
      barOfStaveNotes,
      userClickY
    );
  }
  return {
    newStaveNotesData: staveNotesData,
    newKeys: keys,
    newNotesAndCoordinates: notesAndCoordinates,
  };
};
