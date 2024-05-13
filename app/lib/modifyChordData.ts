import VexFlow from "vexflow";
import {
  Chord,
  ChordInteractionState,
  NoteStringData,
  StaveNoteType,
} from "./typesAndInterfaces";
import {
  parseNote,
  appendAccidentalToNote,
  removeAccidentalFromNote,
} from "./modifyAccidentals";
const { Accidental, StaveNote } = VexFlow.Flow;

export const createStaveNoteFromChordData = (
  chordData: Chord,
  updatedKeys?: string[]
) => {
  const newChordData = { ...chordData };
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : newChordData.keys,
    duration: newChordData.duration,
  });
};

export const addAccidentalsToStaveNotes = (
  newChord: StaveNoteType,
  chordData: Chord
) => {
  const newChordData = { ...chordData };

  newChordData.keys.forEach((key, index) => {
    const { noteBase } = parseNote(key);

    if (noteBase.length < 3)
    {
      
    }
    if (noteBase.length > 2 && noteBase.endsWith("##")) {
      newChord.addModifier(new Accidental("##"), index);
    } else if (noteBase.length > 2 && noteBase.endsWith("bb")) {
      newChord.addModifier(new Accidental("bb"), index);
    } else if (noteBase.length > 1 && noteBase.endsWith("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });

  return newChordData;
};

export const addAccidentalToChordKeys = (
  state: ChordInteractionState,
  chordData: Chord,
  foundNoteIndex: number
) => {
  let newChordData = { ...chordData };

  const accidental = state.isSharpActive ? "#" : "b";
  newChordData.keys[foundNoteIndex] = appendAccidentalToNote(
    accidental,
    newChordData.keys[foundNoteIndex]
  );

  const newChord = createStaveNoteFromChordData(newChordData);

  newChordData = addAccidentalsToStaveNotes(newChord, newChordData);

  return {
    ...newChordData,
    staveNotes: newChord,
  };
};

export const addNewNoteToChord = (
  chordData: Chord,
  foundNoteData: NoteStringData
) => {
  let newChordData = { ...chordData };
  const updatedKeys = [...newChordData.keys, foundNoteData.note];

  const newChord = createStaveNoteFromChordData(newChordData, updatedKeys);

  updatedKeys.forEach((key, index) => {
    const { noteBase } = parseNote(key);

    // Check directly if noteBase ends with an accidental
    if (noteBase.endsWith("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });

  return {
    ...newChordData,
    keys: updatedKeys,
    staveNotes: newChord,
  };
};

export const reconstructChord = (chordData: Chord) => {
  let newChordData = { ...chordData };
  const newChord = createStaveNoteFromChordData(newChordData);

  newChordData.keys.forEach((key, index) => {
    const { noteBase } = parseNote(key);
    if (noteBase.endsWith("#")) {
      newChord.addModifier(new Accidental("#"), index);
    } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
      newChord.addModifier(new Accidental("b"), index);
    }
  });

  return {
    ...newChordData,
    staveNotes: newChord,
  };
};

export const removeNoteFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  let newChordData = { ...chordData };
  if (newChordData.keys[foundNoteIndex]) {
    newChordData.keys.splice(foundNoteIndex, 1);
    const newChord = createStaveNoteFromChordData(newChordData);
    return {
      ...newChordData,
      staveNotes: newChord,
    };
  }
  return newChordData;
};

export const removeAccidentalFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  let newChordData = { ...chordData };
  let note = removeAccidentalFromNote(newChordData.keys[foundNoteIndex]);
  newChordData.keys[foundNoteIndex] = note;
  const newChord = createStaveNoteFromChordData(newChordData);
  return {
    ...newChordData,
    staveNotes: newChord,
  };
};
