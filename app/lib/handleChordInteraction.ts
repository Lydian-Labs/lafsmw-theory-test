import {
  addAccidentalToChordKeys,
  addNewNoteToChord,
  reconstructChord,
  removeAccidentalFromChord,
  removeAccidentalFromNotesAndCoords,
  removeNoteFromChord,
} from "@/app/lib/modifyChords";
import { updateNotesAndCoordsWithAccidental } from "./modifyNotesAndCoordinates";
import {
  Chord,
  StateInteraction,
  NotesAndCoordinatesData,
} from "./typesAndInterfaces";

export const handleChordInteraction = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  chordInteractionState: StateInteraction,
  foundNoteData: NotesAndCoordinatesData,
  chordData: Chord,

  foundNoteIndex: number,
  chosenClef: string
) => {
  let updatedChordData = { ...chordData };
  let updatedNotesAndCoordinates = [...notesAndCoordinates];

  if (chordInteractionState.isSharpActive || chordInteractionState.isFlatActive) {
    if (foundNoteIndex !== -1) {
      updatedNotesAndCoordinates = updateNoteWithAccidental(
        chordInteractionState,
        foundNoteData,
        notesAndCoordinates
      );
      updatedChordData = addAccidentalToChordKeys(
        chordInteractionState,
        chordData,
        foundNoteIndex,
        chosenClef
      );
    }
  } else if (chordInteractionState.isEraseAccidentalActive) {
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
  } else if (chordInteractionState.isEraseNoteActive) {
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
