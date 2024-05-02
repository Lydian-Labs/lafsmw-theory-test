export const parseNote = (note: string) => {
  const [noteBase, octave] = note.split("/");
  return { noteBase, octave };
};

export const redrawNoteWithAccidental = (
  noteBase: string,
  accidental: string,
  octave: string
) => {
  return `${noteBase}${accidental}/${octave}`;
};

export const redrawNoteWithoutAccidental = (
  noteBase: string,
  octave: string
) => {
  return `${noteBase}/${octave}`;
};

export const appendAccidentalToNote = (
  foundNote: string,
  accidental: string
) => {
  const { noteBase, octave } = parseNote(foundNote);
  return redrawNoteWithAccidental(noteBase, accidental, octave);
};

export const removeAccidentalFromNote = (note: string) => {
  let { noteBase, octave } = parseNote(note);
  if (noteBase.length > 1 && noteBase.endsWith("#")) {
    noteBase = noteBase.replace("#", "");
  } else if (noteBase.length > 1 && noteBase.endsWith("b")) {
    noteBase = noteBase.replace("b", "");
  }
  return redrawNoteWithoutAccidental(noteBase, octave);
};
