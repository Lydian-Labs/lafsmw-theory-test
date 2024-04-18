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
  Chord,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const handleChordInteraction = (
  updatedNoteData: NoteStringData,
  noteNotFound: React.Dispatch<ChordInteractionAction>,
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
  } else {
    if (chord.keys.length < 4) {
      const updatedKeys = [...chord.keys, updatedNoteData.note];
      const newChord = new StaveNote({
        keys: updatedKeys,
        duration: chord.duration,
      });
      return { ...chord, keys: updatedKeys, staveNotes: newChord };
    } else return chord;
  }
};
