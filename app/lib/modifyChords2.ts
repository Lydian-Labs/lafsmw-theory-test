import { Chord, NoteStringData, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState } from "./typesAndInterfaces";

export const updatedChord = (chordData: Chord, updatedKeys?: string[]) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : chordData.keys,
    duration: chordData.duration,
  });
};

export const updateKeysAndAddAccidentals = (
  chordData: Chord,
  foundNoteIndex: number,
  state: ChordInteractionState
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  chordData.keys[foundNoteIndex] = chordData.keys[foundNoteIndex] + accidental; // Directly modify the key at the found index

  const newChord = updatedChord(chordData); // Update the chord with all keys, including the new accidental

  // Apply all accidentals freshly from the updated keys array
  chordData.keys.forEach((key, index) => {
    if (key.includes("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (key.includes("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });

  chordData = {
    ...chordData,
    staveNotes: newChord,
  };
  return chordData;
};

export const addAllNotesAndAccidentals = (
  chordData: Chord,
  foundNoteData: NoteStringData
) => {
  const updatedKeys = [...chordData.keys, foundNoteData.note];
  const newChord = updatedChord(chordData, updatedKeys); // Update the chord with all keys, including the new accidental

  // Apply all accidentals freshly from the updated keys array
  chordData.keys.forEach((key, index) => {
    if (key.includes("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (key.includes("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });

  chordData = {
    ...chordData,
    keys: updatedKeys,
    staveNotes: newChord,
  };
  return chordData;
};
