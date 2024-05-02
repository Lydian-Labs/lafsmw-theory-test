import VexFlow from "vexflow";
import {
  Chord,
  ChordInteractionState,
  NoteStringData,
} from "./typesAndInterfaces";
const { Accidental, StaveNote } = VexFlow.Flow;

const parseNote = (note: string) => {
  const noteBase = note.split("/")[0];
  const octave = note.split("/")[1];
  return { noteBase, octave };
};

export const createStaveNoteFromChordData = (
  chordData: Chord,
  updatedKeys?: string[]
) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : chordData.keys,
    duration: chordData.duration,
  });
};

const appendAccidentalToNote = (accidental: string, note: string) => {
  const { noteBase, octave } = parseNote(note);
  return `${noteBase}${accidental}/${octave}`;
};

export const updateNotesWithAccidental = (
  state: ChordInteractionState,
  foundNoteData: NoteStringData,
  notesAndCoordinates: NoteStringData[]
) => {
  const accidental = state.isSharpActive ? "#" : "b";
  foundNoteData.note = appendAccidentalToNote(accidental, foundNoteData.note);
  return notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
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
    let newKey = key;
    let { noteBase } = parseNote(newKey);
    console.log(noteBase);
    if (noteBase.endsWith("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (noteBase.endsWith("b")) {
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
