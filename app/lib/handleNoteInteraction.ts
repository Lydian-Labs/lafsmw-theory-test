import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToStaveNote,
  changeNotePosition,
  removeAccidentalFromStaveNote,
  deleteNote,
  updateNoteWithAccidental,
  removeAccidentalFromNote,
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
  notesData: StaveNoteData[][],
  state: NoteInteractionState,
  userClickX: number,
  userClickY: number,
  barIndex: number
) => {
  let newNotesData = [...notesData];
  let newNotesAndCoordinates = [...notesAndCoordinates];

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
    notesData[barIndex] = barOfStaveNotes;
  } else if (state.isEraseAccidentalActive) {
    removeAccidentalFromStaveNote(barOfStaveNotes, userClickX);
    removeAccidentalFromNote(notesAndCoordinates, foundNoteData);
    notesData[barIndex] = barOfStaveNotes;
  } else if (state.isChangeNoteActive) {
    changeNotePosition(
      barOfStaveNotes,
      userClickX,
      updatedNoteData,
      userClickY
    );
    notesData[barIndex] = barOfStaveNotes;
  } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [updatedNoteData.note],
      duration: "q",
    });
    notesData[barIndex] = [
      ...barOfStaveNotes,
      {
        staveNote: newStaveNote,
        staveNoteAbsoluteX: 0,
        userClickY,
      },
    ];
  }
};
