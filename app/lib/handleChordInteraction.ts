import {
  addAccidentalToChordKeys,
  addNewStaveNoteToChord,
  removeAccidentalFromNote,
  reconstructChord,
  removeAccidentalFromChord,
  removeNoteFromChord,
  updateNoteWithAccidental,
} from "@/app/lib/modifyChords";
import {
  Chord,
  ChordInteractionState,
  FoundNoteData,
} from "./typesAndInterfaces";

export const handleChordInteraction = (
  notesAndCoordinates: FoundNoteData[],
  state: ChordInteractionState,
  foundNoteData: FoundNoteData,
  chordData: Chord,
  foundNoteIndex: number
) => {
  let updatedChordData = { ...chordData };
  let updatedNotesAndCoordinates = [...notesAndCoordinates];

  if (state.isSharpActive || state.isFlatActive) {
    if (foundNoteIndex !== -1) {
      updatedNotesAndCoordinates = updateNoteWithAccidental(
        state,
        foundNoteData,
        notesAndCoordinates
      );
      updatedChordData = addAccidentalToChordKeys(
        state,
        chordData,
        foundNoteIndex
      );
    }
  } else if (state.isEraseAccidentalActive) {
    if (foundNoteIndex !== -1) {
      notesAndCoordinates = removeAccidentalFromNote(
        notesAndCoordinates,
        foundNoteData
      );
      updatedChordData = removeAccidentalFromChord(chordData, foundNoteIndex);
      updatedChordData = reconstructChord(chordData);
    }
  } else if (state.isEraseNoteActive) {
    if (foundNoteIndex !== -1) {
      updatedChordData = removeNoteFromChord(chordData, foundNoteIndex);
      updatedNotesAndCoordinates = removeAccidentalFromNote(
        notesAndCoordinates,
        foundNoteData
      );
      updatedChordData = reconstructChord(chordData);
    }
  } else {
    if (updatedChordData.keys.length >= 4)
      return { chordData, notesAndCoordinates };

    updatedChordData = addNewStaveNoteToChord(chordData, foundNoteData);
  }
  return {
    chordData: updatedChordData,
    notesAndCoordinates: updatedNotesAndCoordinates,
  };
};
