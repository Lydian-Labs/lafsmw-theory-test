import { Chord, NoteStringData } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState } from "./typesAndInterfaces";

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

export const eraseAccidental = (note: string) => {
  let noteParts = note.split("/");
  if (noteParts[0].includes("#")) {
    noteParts[0] = noteParts[0].replace("#", "");
  } else if (noteParts[0].includes("b")) {
    noteParts[0] = noteParts[0].replace("b", "");
  }
  return `${noteParts[0]}/${noteParts[1]}`;
};

export const eraseAccidentalFromChordData = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  let note = eraseAccidental(chordData.keys[foundNoteIndex]);
  chordData.keys[foundNoteIndex] = note;
  const newChord = updatedChord(chordData);
  return {
    ...chordData,
    staveNotes: newChord,
  };
};

export const eraseAccidentalFromNotesAndCoordinates = (
  notesAndCoordinates: NoteStringData[],
  foundNoteData: NoteStringData
) => {
  foundNoteData.note = eraseAccidental(foundNoteData.note);
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

  const newChord = updatedChord(chordData);
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
  const newChord = updatedChord(chordData, updatedKeys);
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

export const redrawChordAfterRemovingAccidental = (chordData: Chord) => {
  const newChord = updatedChord(chordData);
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
