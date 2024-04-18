import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToChord,
  changeNotePosition,
  deleteAccidental,
  deleteNote,
} from "./modifyNotes";
import {
  ChordInteractionState,
  ChordInteractionAction,
  NoteStringData,
  StaveNoteData,
  StaveNoteType,
  Chord,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const handleChordInteraction = (
  updatedNoteData: NoteStringData,
  noteNotFound: React.Dispatch<ChordInteractionAction>,
  checkBeatsInMeasure: React.Dispatch<ChordInteractionAction>,
  beatsInMeasureAction: string,
  noNoteFoundAction: string,
  chord: Chord,
  state: ChordInteractionState
) => {
  if (!updatedNoteData) {
    noteNotFound({ type: noNoteFoundAction });
  } else if (state.isSharpActive || state.isFlatActive) {
    addAccidentalToChord(
      chord,
      updatedNoteData,
      state.isSharpActive ? "#" : "b"
    );
  }
};
