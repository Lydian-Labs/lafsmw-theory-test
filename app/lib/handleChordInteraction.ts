import VexFlow from "vexflow";
import { BEATS_IN_MEASURE } from "./data/stavesData";
import {
  addAccidentalToNote,
  changeNotePosition,
  deleteAccidental,
  deleteNote,
} from "./modifyNotes";
import {
  ChordInteractionState,
  KeySigState,
  NoteInteractionAction,
  NoteInteractionState,
  NoteStringData,
  StaveNoteData,
  StaveNoteType,
  Chord,
} from "./typesAndInterfaces";
const { StaveNote } = VexFlow.Flow;

export const handleChordInteraction = (
  updatedFoundNoteData: NoteStringData,
  noteNotFound: React.Dispatch<NoteInteractionAction>,
  //checkBeatsInMeasure: React.Dispatch<NoteInteractionAction>,
  //beatsInMeasureAction: string,
  noNoteFoundAction: string,
  //barOfStaveNotes: StaveNoteData[],
  //notesDataCopy: StaveNoteData[][],
  chordData: Chord,
  //state: NoteInteractionState | KeySigState | ChordInteractionState,
  //userClickX: number,
  userClickY: number
  //barIndex: number
) => {
  if (!updatedFoundNoteData) {
    noteNotFound({ type: noNoteFoundAction });
    //   } else if (state.isSharpActive || state.isFlatActive) {
    //     addAccidentalToNote(
    //       barOfStaveNotes,
    //       userClickX,
    //       state.isSharpActive ? "#" : "b"
    //     );
    //   } else if (state.isEraseNoteActive) {
    //     deleteNote(barOfStaveNotes, userClickX);
    //     notesDataCopy[barIndex] = barOfStaveNotes;
    //   } else if (state.isEraseAccidentalActive) {
    //     deleteAccidental(barOfStaveNotes, userClickX);
    //     notesDataCopy[barIndex] = barOfStaveNotes;
    //   } else if (state.isChangeNoteActive) {
    //     changeNotePosition(
    //       barOfStaveNotes,
    //       userClickX,
    //       updatedNoteData,
    //       userClickY
    //     );
    //     notesDataCopy[barIndex] = barOfStaveNotes;
    //   } else if (barOfStaveNotes && barOfStaveNotes.length >= BEATS_IN_MEASURE) {
    //     checkBeatsInMeasure({ type: beatsInMeasureAction });
  } else if (chordData.keys.length >= 4) return;
  else {
    const updatedKeys = [...chordData.keys, updatedFoundNoteData.note];
console.log(updatedKeys)
    const newChord = new StaveNote({
      keys: updatedKeys,
      duration: chordData.duration,
    });

    return {
      ...chordData,
      keys: updatedKeys,
      staveNotes: newChord,
      userClickY: userClickY,
    };
  }
};
