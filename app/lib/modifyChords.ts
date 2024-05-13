import VexFlow from "vexflow";
import {
  Chord,
  ChordInteractionState,
  NoteStringData,
  NotesAndCoordinatesData,
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

const getAccidentalType = (noteBase: string) => {
  if (noteBase.endsWith("##")) return "##";
  if (noteBase.endsWith("bb") && noteBase.length > 2) return "bb";
  if (noteBase.endsWith("#")) return "#";
  if (noteBase.endsWith("b") && noteBase.length > 1) return "b";
  return null;
};

const addAccidentalsToStaveNotes = (
  keys: string[],
  newChord: StaveNoteType
) => {
  keys.forEach((key, index) => {
    const { noteBase } = parseNote(key);
    const accidentalType = getAccidentalType(noteBase);

    if (accidentalType) {
      newChord.addModifier(new Accidental(accidentalType), index);
    }
  });
};

const appendAccidentalToNote = (accidental: string, note: string) => {
  const { noteBase, octave } = parseNote(note);
  if (
    (accidental === "#" && noteBase.length > 1 && noteBase.endsWith("b")) ||
    (accidental === "b" && noteBase.endsWith("#"))
  ) {
    console.log("Cannot add contradictory accidentals to the same note.");
    return note;
  }
  if (noteBase.length < 3) {
    return `${noteBase}${accidental}/${octave}`;
  }
  return `${noteBase}/${octave}`;
};

export const updateNoteWithAccidental = (
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

export const removeAccidentals = (note: string) => {
  let { noteBase, octave } = parseNote(note);
  if (noteBase.length > 2) {
    if (noteBase.endsWith("##")) {
      noteBase = noteBase.replace("##", "");
    } else if (noteBase.endsWith("bb")) {
      noteBase = noteBase.replace("bb", "");
    }
  } else if (noteBase.length > 1) {
    if (noteBase.endsWith("b")) {
      noteBase = noteBase.replace("b", "");
    } else if (noteBase.endsWith("#")) {
      noteBase = noteBase.replace("#", "");
    }
  }

  return `${noteBase}/${octave}`;
};

export const removeAccidentalFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  chordData.keys[foundNoteIndex] = removeAccidentals(
    chordData.keys[foundNoteIndex]
  );
  return {
    ...chordData,
    staveNotes: createStaveNoteFromChordData(chordData),
  };
};

export const removeAccidentalFromNotesAndCoords = (
  notesAndCoordinates: NotesAndCoordinatesData[],
  foundNoteData: NotesAndCoordinatesData
) => {
  foundNoteData.note = removeAccidentals(foundNoteData.note);
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

  return {
    ...chordData,
    staveNotes: newChord,
  };
};

export const addNewNoteToChord = (
  chordData: Chord,
  foundNoteData: NoteStringData
) => {
  const updatedKeys = [...chordData.keys, foundNoteData.note];
  const newChord = createStaveNoteFromChordData(chordData, updatedKeys);

  addAccidentalsToStaveNotes(updatedKeys, newChord);

  return {
    ...chordData,
    keys: updatedKeys,
    staveNotes: newChord,
  };
};

export const reconstructChord = (chordData: Chord) => {
  const newChord = createStaveNoteFromChordData(chordData);
  addAccidentalsToStaveNotes(chordData.keys, newChord);

  return {
    ...chordData,
    staveNotes: newChord,
  };
};

export const removeNoteFromChord = (
  chordData: Chord,
  foundNoteIndex: number
) => {
  if (chordData.keys[foundNoteIndex]) {
    chordData.keys.splice(foundNoteIndex, 1);
    const newChord = createStaveNoteFromChordData(chordData);
    return {
      ...chordData,
      staveNotes: newChord,
    };
  }
  return chordData;
};
