import {
  addAccidentalToChordKeys,
  addNewNoteToChord,
  removeAccidentalFromNotesAndCoords,
  reconstructChord,
  removeAccidentalFromChord,
  removeNoteFromChord,
  updateNoteWithAccidental,
} from "@/app/lib/modifyChords";
import {
  Chord,
  ChordInteractionState,
  NotesAndCoordinatesData,
} from "./typesAndInterfaces";
import { updateNotesAndCoordsWithAccidental } from "./modifyNotesAndCoordinates";

export const handleChordInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: ChordInteractionState,
  foundNoteData: NotesAndCoordinatesData,
  chordData: Chord,

  foundNoteIndex: number,
  chosenClef: string
) => {
  if (state.isSharpActive || state.isFlatActive) {
    if (foundNoteIndex !== -1) {
      notesAndCoordinates = updateNotesAndCoordsWithAccidental(
        state,
        foundNoteData,
        notesAndCoordinates
      );

      chordData = addAccidentalToChordKeys(
        state,
        chordData,
        foundNoteIndex,
        chosenClef
      );
    }
  } else if (state.isEraseAccidentalActive) {
    if (foundNoteIndex !== -1) {
      notesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );
      chordData = removeAccidentalFromChord(
        chordData,
        foundNoteIndex,
        chosenClef
      );

      chordData = reconstructChord(chordData, chosenClef);
    }
  } else if (state.isEraseNoteActive) {
    if (foundNoteIndex !== -1) {
      chordData = removeNoteFromChord(chordData, foundNoteIndex, chosenClef);
      notesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );

      chordData = reconstructChord(chordData, chosenClef);
    }
  } else {
    if (chordData.keys && chordData.keys.length >= 4)
      return { chordData, notesAndCoordinates };

    if (chordData.keys)
      chordData = addNewNoteToChord(chordData, foundNoteData, chosenClef);
  }
  return {
    chordData,
    notesAndCoordinates,
  };
};
