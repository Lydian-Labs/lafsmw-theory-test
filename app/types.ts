export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

export type ObjectInput = {
  [key: string]: string;
};

export type WriteProps = {
  numBars: number;
  chords: string[];
  handleChords: (chords: ObjectInput) => void;
};

export type WriteBlues = {
  numBars: number;
  chords: string[];
  handleBlues: (blues: ObjectInput) => void;
};

export type WriteProg = {
  numBars: number;
  chords: string[];
  handleProg: (progressions: ObjectInput) => void;
};
