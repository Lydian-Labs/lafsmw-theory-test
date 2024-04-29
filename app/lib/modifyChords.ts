import VexFlow from "vexflow";
import {
  Chord,
  ChordInteractionState,
  NoteStringData,
} from "./typesAndInterfaces";
const { Accidental, StaveNote } = VexFlow.Flow;

export const createStaveNoteFromChordData = (
  chordData: Chord,
  updatedKeys?: string[]
) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : chordData.keys,
    duration: chordData.duration,
  });
};

const appendAccidentalToNote = (accidental: string, foundNote: string) => {
  const note = foundNote.split("/")[0];
  const octave = foundNote.split("/")[1];
  return `${note}${accidental}/${octave}`;
};

export const updateNotesWithAccidental = (
  state: ChordInteractionState,
  foundNoteData: NoteStringData,
  notesAndCoordinates: NoteStringData[]
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  foundNoteData.note = appendAccidentalToNote(accidental, foundNoteData.note);
  const updatedNotesAndCoordinates = notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
  return updatedNotesAndCoordinates;
};

export const removeAccidentalFromNote = (note: string) => {
  let noteParts = note.split("/");
  if (noteParts[0].includes("#")) {
    noteParts[0] = noteParts[0].replace("#", "");
  } else if (noteParts[0].includes("b")) {
    noteParts[0] = noteParts[0].replace("b", "");
  }
  return `${noteParts[0]}/${noteParts[1]}`;
};

export const removeAccidentalFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  let note = removeAccidentalFromNote(chordData.keys[foundNoteIndex]);
  chordData.keys[foundNoteIndex] = note;
  const newChord = createStaveNoteFromChordData(chordData);
  return {
    ...chordData,
    staveNotes: newChord,
  };
};

export const eraseAccidentalFromNotes = (
  notesAndCoordinates: NoteStringData[],
  foundNoteData: NoteStringData
) => {
  foundNoteData.note = removeAccidentalFromNote(foundNoteData.note);
  const updatedNotesAndCoordinates = notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
  return updatedNotesAndCoordinates;
};

export const addAccidentalToChordKeys = (
  state: ChordInteractionState,
  chordData: Chord,
  foundNoteIndex: number
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  chordData.keys[foundNoteIndex] = appendAccidentalToNote(
    accidental,
    chordData.keys[foundNoteIndex]
  );

  const newChord = createStaveNoteFromChordData(chordData);
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

export const addNewNoteToChord = (
  chordData: Chord,
  foundNoteData: NoteStringData
) => {
  const updatedKeys = [...chordData.keys, foundNoteData.note];
  const newChord = createStaveNoteFromChordData(chordData, updatedKeys);
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

export const reconstructChord = (chordData: Chord) => {
  const newChord = createStaveNoteFromChordData(chordData);
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

export const removeNoteFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  if (chordData.keys[foundNoteIndex]) {
    chordData.keys.splice(foundNoteIndex, 1);
    const newChord = createStaveNoteFromChordData(chordData);
    chordData = {
      ...chordData,
      staveNotes: newChord,
    };
    return chordData;
  }
  return chordData;
};
