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
    barIndex: number
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
        updatedChordData[barIndex] = addAccidentalToChordKeys(
          state,
          chordData,
          foundNoteIndex
        );
      }
    } else if (state.isEraseAccidentalActive) {
      if (foundNoteIndex !== -1) {
        updatedNotesAndCoordinates = removeAccidentalFromNotesAndCoords(
          notesAndCoordinates,
          foundNoteData
        );
        updatedChordData[barIndex] = removeAccidentalFromChord(chordData, foundNoteIndex);
        updatedChordData[barIndex] = reconstructChord(chordData);
      }
    } else if (state.isEraseNoteActive) {
      if (foundNoteIndex !== -1) {
        updatedChordData = removeNoteFromChord(chordData, foundNoteIndex);
        updatedNotesAndCoordinates = removeAccidentalFromNotesAndCoords(
          notesAndCoordinates,
          foundNoteData
        );
        updatedChordData[barIndex] = reconstructChord(chordData);
      }
    } else {
      if (updatedChordData.keys.length >= 4)
        return { chordData, notesAndCoordinates };
  
      updatedChordData[barIndex] = addNewNoteToChord(chordData, foundNoteData);
    }
    return {
      chordData: updatedChordData,
      notesAndCoordinates: updatedNotesAndCoordinates,
    };
  };
  