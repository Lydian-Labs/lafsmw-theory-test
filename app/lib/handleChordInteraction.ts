import {
  addAccidentalToChordKeys,
  addNewNoteToChord,
  eraseAccidentalFromNotes,
  reconstructChord,
  removeAccidentalFromChord,
  removeNoteFromChord,
  updateNotesWithAccidental,
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
    updatedNotesAndCoordinates = updateNotesWithAccidental(
      state,
      foundNoteData,
      notesAndCoordinates
    );
    if (foundNoteIndex !== -1) {
      updatedChordData = addAccidentalToChordKeys(
        state,
        chordData,
        foundNoteIndex
      );
    }
  } else if (state.isEraseAccidentalActive) {
    notesAndCoordinates = eraseAccidentalFromNotes(
      notesAndCoordinates,
      foundNoteData
    );
    if (foundNoteIndex !== -1) {
      updatedChordData = removeAccidentalFromChord(chordData, foundNoteIndex);
    }
    updatedChordData = reconstructChord(chordData);
  } else if (state.isEraseNoteActive) {
    if (foundNoteIndex !== -1) {
      updatedChordData = removeNoteFromChord(chordData, foundNoteIndex);
      updatedNotesAndCoordinates = eraseAccidentalFromNotes(
        notesAndCoordinates,
        foundNoteData
      );
      updatedChordData = reconstructChord(chordData);
    }
  } else {
    if (updatedChordData.keys.length >= 4)
      return { chordData, notesAndCoordinates };

    updatedChordData = addNewNoteToChord(chordData, foundNoteData);
  }
  return {
    chordData: updatedChordData,
    notesAndCoordinates: updatedNotesAndCoordinates,
  };
};
