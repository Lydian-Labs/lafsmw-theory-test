import {
  Chord,
  ChordInteractionState,
  InputState,
  KeySigState,
  NoteInteractionState,
  NotesAndCoordinatesData,
  ScaleData,
} from "./typesAndInterfaces";

export const initialChordData: Chord = {
  keys: [],
  duration: "w",
  staveNotes: null,
  userClickY: 0,
};

export const initialScaleState: ScaleData = {
  keys: [""],
  duration: "q",
  staveNote: null,
  userClickY: 0,
  staveNoteAbsoluteX: 0,
};

export const initialNotesAndCoordsState: NotesAndCoordinatesData = {
  note: "",
  originalNote: "",
  yCoordinateMin: 0,
  yCoordinateMax: 0,
};

export const noteInteractionInitialState: NoteInteractionState = {
  isEraseNoteActive: false,
  isEraseAccidentalActive: false,
  isEnterNoteActive: true,
  isSharpActive: false,
  noNoteFound: false,
  tooManyBeatsInMeasure: false,
  isFlatActive: false,
  isChangeNoteActive: false,
};
export const chordInteractionInitialState: ChordInteractionState = {
  isEraseNoteActive: false,
  isEraseAccidentalActive: false,
  isEnterNoteActive: true,
  isSharpActive: false,
  noNoteFound: false,
  isFlatActive: false,
};

export const keySigInitialState: KeySigState = {
  isSharpActive: false,
  isFlatActive: false,
  isEraseAccidentalActive: false,
  isClearKeySigActive: false,
};

export const initialFormInputState: InputState = {
  userId: "",
  user: null,
  level: "select-here",
  keySignatures: {},
  keySignaturesNotation1: [],
  keySignaturesNotation2: [],
  keySignaturesNotation3: [],
  keySignaturesNotation4: [],
  scales1: [],
  scales2: [],
  scales3: [],
  scales4: [],
  scales5: [],
  scales6: [],
  triads1: [],
  triads2: [],
  triads3: [],
  triads4: [],
  triads5: [],
  triads6: [],
  seventhChords1: [],
  seventhChords2: [],
  seventhChords3: [],
  seventhChords4: [],
  seventhChords5: [],
  seventhChords6: [],
  chords: {},
  progressions: {},
  blues: {},
  bluesUrl: "",
};
