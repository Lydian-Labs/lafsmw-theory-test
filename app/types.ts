export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type ObjectInput = {
  [key: string]: string;
};

type Chord = {
  keys: string[];
  duration: string;
};

export type StaffProps = {
  clef?: string;
  timeSignature?: string;
  noTimeSignature?: boolean;
  width?: number;
  height?: number;
  addDoubleBarLine?: boolean;
  numBars: number;
  chords?: Chord[];
};

export type WriteProps = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleChords: (chords: ObjectInput) => void;
};

export type KeySignatureProps = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleKeySignatures: (keySignatures: ObjectInput) => void;
};

export type WriteBlues = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleBlues: (blues: ObjectInput) => void;
};

export type WriteProg = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleProg: (progressions: ObjectInput) => void;
};

export type ButtonProps = {
  labelText: string;
  onClick: (e: MouseEvent) => void;
  sx?: object;
};
