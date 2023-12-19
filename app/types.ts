export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type ChordsInput = {
  [key: string]: string;
};

export type WriteProps = {
  numBars: number;
  chords: string[];
  handleChords: (chords: ChordsInput) => void;
};

export type WriteState = {
  chords: ChordsInput;
  error: string;
};
