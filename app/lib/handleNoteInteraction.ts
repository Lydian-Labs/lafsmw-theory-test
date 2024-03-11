import VexFlow from "vexflow";
const { StaveNote } = VexFlow.Flow;
import {
  StaveNoteData,
  NoteStringData,
  Action,
  NoteInteractionState,
  StaveNoteType,
} from "./typesAndInterfaces";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToNote,
  deleteNote,
  deleteAccidental,
  changeNotePosition,
} from "./modifyNotes";

export const handleNoteInteraction = (
  updatedNoteData: NoteStringData,
  noteNotFound: React.Dispatch<Action>,
  checkBeatsInMeasure: React.Dispatch<Action>,
  beatsInMeasureAction: string,
  noNoteFoundAction: string,
  barOfStaveNotes: StaveNoteData[],
  notesDataCopy: StaveNoteData[][],
  state: NoteInteractionState,
  userClickX: number,
  userClickY: number,
  barIndex: number
) => {
  if (!updatedNoteData) {
    noteNotFound({ type: noNoteFoundAction });
  } else if (state.isSharpActive || state.isFlatActive) {
    addAccidentalToNote(
      barOfStaveNotes,
      userClickX,
      state.isSharpActive ? "#" : "b"
    );
  } else if (state.isEraseNoteActive) {
    deleteNote(barOfStaveNotes, userClickX);
    notesDataCopy[barIndex] = barOfStaveNotes;
  } else if (state.isEraseAccidentalActive) {
    deleteAccidental(barOfStaveNotes, userClickX);
    notesDataCopy[barIndex] = barOfStaveNotes;
  } else if (state.isChangeNoteActive) {
    changeNotePosition(
      barOfStaveNotes,
      userClickX,
      updatedNoteData,
      userClickY
    );
    notesDataCopy[barIndex] = barOfStaveNotes;
  } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
    checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else {
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [updatedNoteData.note],
      duration: "q",
    });
    notesDataCopy[barIndex] = [
      ...barOfStaveNotes,
      {
        newStaveNote,
        staveNoteAbsoluteX: 0,
        userClickY,
      },
    ];
  }
};
