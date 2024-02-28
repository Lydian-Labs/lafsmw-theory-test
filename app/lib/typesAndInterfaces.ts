import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { StaveNote, Stave } = VF;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type InputData = {
  [key: string]: string;
};

export type Chord = {
  keys: string[];
  duration: string;
};

export type StateType = {
  isEraseNoteActive: boolean;
  isEraseAccidentalActive: boolean;
  isChangeNoteActive: boolean;
  isEnterNoteActive: boolean;
  isSharpActive: boolean;
  noNoteFound: boolean;
  tooManyBeatsInMeasure?: boolean;
  isFlatActive: boolean;
  [key: string]: boolean | undefined; //This is an index signature. This is a type in TypeScript that allows indexing into an object with a string
};

export type Action = { type: keyof StateType };

export const initialState: StateType = {
  isEraseNoteActive: false,
  isEraseAccidentalActive: false,
  isEnterNoteActive: true,
  isSharpActive: false,
  noNoteFound: false,
  tooManyBeatsInMeasure: false,
  isFlatActive: false,
  isChangeNoteActive: false,
};
export type AccidentalStateType = {
  isAddSharpActive: boolean;
  isAddFlatActive: boolean;
  isRemoveSharpActive: boolean;
  isRemoveFlatActive: boolean;
  isClearMeasuresActive: boolean;
};
export type StaveType = InstanceType<typeof Stave>;

export type StaveNoteType = InstanceType<typeof StaveNote>;

export interface UserClickInfo {
  rect: DOMRect | undefined;
  userClickX: number;
  userClickY: number;
  topStaveYPosition: number;
  highGYPosition: number;
}

export interface StaveNoteData {
  newStaveNote: StaveNoteType;
  staveNoteAbsoluteX: number;
  userClickY: number;
}

export interface NoteStringData {
  note: string;
  yCoordinateMin: number;
  yCoordinateMax: number;
  userClickY?: number;
}

export interface CheckNumBeatsInMeasureProps {
  tooManyBeatsInMeasure: boolean | undefined;
  openEnterNotes: React.Dispatch<Action>;
}
