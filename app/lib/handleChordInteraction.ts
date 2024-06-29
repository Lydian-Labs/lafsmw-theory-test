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

export const handleChordInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  state: ChordInteractionState,
  foundNoteData: NotesAndCoordinatesData,
  chordData: Chord,
  foundNoteIndex: number,
  chosenClef: string
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
        foundNoteIndex,
        chosenClef
      );
    }
  } else if (state.isEraseAccidentalActive) {
    if (foundNoteIndex !== -1) {
      updatedNotesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );
      updatedChordData = removeAccidentalFromChord(
        chordData,
        foundNoteIndex,
        chosenClef
      );
      updatedChordData = reconstructChord(chordData, chosenClef);
    }
  } else if (state.isEraseNoteActive) {
    if (foundNoteIndex !== -1) {
      updatedChordData = removeNoteFromChord(
        chordData,
        foundNoteIndex,
        chosenClef
      );
      updatedNotesAndCoordinates = removeAccidentalFromNotesAndCoords(
        notesAndCoordinates,
        foundNoteData
      );
      updatedChordData = reconstructChord(chordData, chosenClef);
    }
  } else {
    if (updatedChordData.keys && updatedChordData.keys.length >= 4)
      return { chordData, notesAndCoordinates };

    if (chordData.keys)
      updatedChordData = addNewNoteToChord(
        chordData,
        foundNoteData,
        chosenClef
      );
  }
  return {
    chordData: updatedChordData,
    notesAndCoordinates: updatedNotesAndCoordinates,
  };
};
