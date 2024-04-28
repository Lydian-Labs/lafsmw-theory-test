import { Chord, NoteStringData, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState, ActiveNote } from "./typesAndInterfaces";

export const updatedChord = (chordData: Chord, updatedKeys?: string[]) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : chordData.keys,
    duration: chordData.duration,
  });
};

const splitNote = (accidental: string, foundNote: string) => {
  const note = foundNote.split("/")[0];
  const octave = foundNote.split("/")[1];
  return `${note}${accidental}/${octave}`;
};

export const addAccidentalToNotesAndCoordinates = (
  state: ChordInteractionState,
  foundNoteData: NoteStringData,
  notesAndCoordinates: NoteStringData[]
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  foundNoteData.note = splitNote(accidental, foundNoteData.note);
  const updatedNotesAndCoordinates = notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
  return updatedNotesAndCoordinates;
};

export const updateKeysAndAddAccidentals = (
  state: ChordInteractionState,
  chordData: Chord,
  foundNoteIndex: number
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  chordData.keys[foundNoteIndex] = splitNote(
    accidental,
    chordData.keys[foundNoteIndex]
  );

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

export const eraseAccidental = () => {};
