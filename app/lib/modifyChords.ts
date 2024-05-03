import VexFlow from "vexflow";
import {
  Chord,
  ChordInteractionState,
  NoteStringData,
  StaveNoteType,
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

const addAccidentalsToStaveNotes = (
  keys: string[],
  newChord: StaveNoteType
) => {
  keys.forEach((key, index) => {
    let newKey = key;
    let { noteBase } = parseNote(newKey);
    if (noteBase.endsWith("##")) {
      newChord.addModifier(new Accidental("##"), index);
    } else if (noteBase.endsWith("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (noteBase.length > 2 && noteBase.endsWith("bb")) {
      newChord.addModifier(new Accidental("bb"), index);
    } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });
};

const appendAccidentalToNote = (accidental: string, note: string) => {
  const { noteBase, octave } = parseNote(note);
  if (
    (accidental === "#" && noteBase.length > 1 && noteBase.endsWith("b")) || // Prevent adding a sharp to a flat
    (accidental === "b" && noteBase.endsWith("#")) // Prevent adding a flat to a sharp
  ) {
    console.log("Cannot add contradictory accidentals to the same note.");
    return note; // Return the note unchanged
  }
  if (noteBase.length < 3) {
    return `${noteBase}${accidental}/${octave}`;
  }
  return `${noteBase}/${octave}`;
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
  let { noteBase, octave } = parseNote(note);
  if (noteBase.length > 2 && noteBase.endsWith("##")) {
    noteBase = noteBase.replace("##", "");
  } else if (noteBase.length > 2 && noteBase.endsWith("bb")) {
    noteBase = noteBase.replace("bb", "");
  } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
    noteBase = noteBase.replace("b", "");
  } else if (noteBase.endsWith("#")) {
    noteBase = noteBase.replace("#", "");
  }
  return `${noteBase}/${octave}`;
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
  return notesAndCoordinates.map((noteData) =>
    noteData === foundNoteData
      ? { ...noteData, note: foundNoteData.note }
      : noteData
  );
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

  addAccidentalsToStaveNotes(chordData.keys, newChord);

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

  addAccidentalsToStaveNotes(updatedKeys, newChord);

  chordData = {
    ...chordData,
    keys: updatedKeys,
    staveNotes: newChord,
  };
  console.log(chordData);
  return chordData;
};

export const reconstructChord = (chordData: Chord) => {
  const newChord = createStaveNoteFromChordData(chordData);
  addAccidentalsToStaveNotes(chordData.keys, newChord);

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
