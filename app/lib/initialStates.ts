import {
  ChordInteractionState,
  InputState,
  KeySigState,
  NoteInteractionState,
} from "./typesAndInterfaces";

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
  isAddSharpActive: false,
  isAddFlatActive: false,
  isRemoveAccidentalActive: false,
  isClearKeySigActive: false,
};

export const initialFormInputState: InputState = {
  userId: "",
  user: null,
  level: "",
  keySignatures: {},
  keySignaturesNotation1: [],
  keySignaturesNotation2: [],
  keySignaturesNotation3: [],
  keySignaturesNotation4: [],
  scales1: [],
  scales2: [],
  scales3: [],
  scales4: [],
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
