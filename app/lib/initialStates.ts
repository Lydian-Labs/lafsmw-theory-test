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
  //tooManyBeatsInMeasure: false,
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
  chords: {},
  progressions: {},
  blues: {},
};
