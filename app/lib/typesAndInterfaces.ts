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

export type StaveType = InstanceType<typeof Stave>;
export type StaveNoteType = InstanceType<typeof StaveNote>;

export interface StaveNoteAndUserClickXAndYCoords {
  newStaveNote: StaveNoteType;
  userClickX: number;
  userClickY: number;
  absoluteXCoord?: number;
}

export interface NoteStringAndYMinAndYMax {
  note: string;
  yCoordinateMin: number;
  yCoordinateMax: number;
}

export interface NoteStringYMinAndYMaxAndUserClickCoords {
  note: string;
  yCoordinateMin: number;
  yCoordinateMax: number;
  userClickX: number;
  userClickY: number;
  absoluteXCoord?: number;
}
