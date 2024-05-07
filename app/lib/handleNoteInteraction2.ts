import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToStaveNote,
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
  StaveNoteType,
  FoundNoteData,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const handleNoteInteraction = (
  updatedNoteData: NoteStringData,
  noteNotFound: React.Dispatch<NoteInteractionAction>,
  checkBeatsInMeasure: React.Dispatch<NoteInteractionAction>,
  beatsInMeasureAction: string,
  noNoteFoundAction: string,
  barOfStaveNotes: StaveNoteData[],
  notesAndCoordinates: FoundNoteData[],
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
    addAccidentalToStaveNote(
      barOfStaveNotes,
      userClickX,
      state.isSharpActive ? "#" : "b"
    );
    updateNoteWithAccidental(state, foundNoteData, notesAndCoordinates);
  } else if (state.isEraseNoteActive) {
    deleteNote(barOfStaveNotes, userClickX);
    removeAccidentalFromNote(notesAndCoordinates, foundNoteData);
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (state.isEraseAccidentalActive) {
    removeAccidentalFromStaveNote(barOfStaveNotes, userClickX);
    removeAccidentalFromNote(notesAndCoordinates, foundNoteData);
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (state.isChangeNoteActive) {
    changeNotePosition(
      barOfStaveNotes,
      userClickX,
      updatedNoteData,
      userClickY
    );
    removeAccidentalFromNote(notesAndCoordinates, foundNoteData);
    staveNotesData[barIndex] = barOfStaveNotes;
  } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    staveNotesData[barIndex] = addStaveNoteToScale(
      updatedNoteData,
      "q",
      barOfStaveNotes,
      userClickY
    );
  }
};
