const triadDMajor = ["d/4", "f#/4", "a/4"];
const triadFsharpMajor = ["f#/4", "a#/4", "c#/5"];
const triadDbMinor = ["db/4", "f/4", "ab/4"];
const triadFsharpMinor = ["f#/4", "a/4", "c#/5"];
const triadEbDiminished = ["eb/4", "g/5", "bb/5"];
const triadEAugmented = ["e/4", "g#/4", "b#/4"];

const scaleDbMajor = ["db/4", "eb/4", "f/4", "gb/4", "ab/4", "bb/4", "c/5"];
const scaleBMajor = ["b/4", "c#/5", "d#/5", "e/5", "f#/5", "g#/5", "a#/5"];
const scaleFSharpDorian = ["f#/4", "g#/4", "a/4", "b/4", "c#/5", "d#/5", "e/5"];
const scaleCDorian = ["c/4", "d/4", "eb/4", "f/4", "g/4", "a/4", "bb/4"];
const scaleBbMixolydian = ["bb/4", "c/5", "d/5", "eb/5", "f/5", "g/5", "ab/5"];
const scaleCSharpMixolydian = [
  "c#/4",
  "d#/4",
  "e#/4",
  "f#/4",
  "g#/4",
  "a#/4",
  "b/4",
];

const keySignatureDbMajor = ["bb", "eb", "ab", "db", "gb"];
const keySignatureFSharp = ["f#", "c#", "g#", "d#"];
const keySignatureGminor = ["bb", "eb"];
const keySignatureGSharpMinor = ["f#", "c#", "g#", "d#", "a#"];

const chordEmin7flat5 = ["e/4", "g/4", "bb/4", "d/5"];
const chordGmin7 = ["g/4", "bb/5", "d/5", "f/5"];
const chordDbdominant7 = ["db/4", "f/4", "ab/4", "c/5"];
const chordDsharpdim7 = ["d#/4", "f#/4", "a/4", "c/5"];
const chordDhalfdim7 = ["d/4", "f/4", "ab/4", "c/5"];
const chordGbaug7 = ["g/4", "bb/4", "d#/5", "f#/5"];
const chordEbmindim7 = ["eb/4", "gb/4", "bb/4", "db/5"];

export const correctTriadAnswers = [
  triadDMajor,
  triadFsharpMajor,
  triadDbMinor,
  triadFsharpMinor,
  triadEbDiminished,
  triadEAugmented,
];

export const correctScalesAnswers = [
  scaleDbMajor,
  scaleBMajor,
  scaleCDorian,
  scaleFSharpDorian,
  scaleBbMixolydian,
  scaleCSharpMixolydian,
];

export const correctKeySigNotationAnswers = [
  keySignatureDbMajor,
  keySignatureFSharp,
  keySignatureGminor,
  keySignatureGSharpMinor,
];

export const correctSeventhChordNotationAnswers = [
  chordEmin7flat5,
  chordGmin7,
  chordDbdominant7,
  chordDsharpdim7,
  chordDhalfdim7,
  chordGbaug7,
  chordEbmindim7,
];

export const correctSeventhChordAnswers = ["A", "B", "C", "D", "E", "F", "G"];

export const correctKeySigAnswers = ["db", "a", "f", "c#"];

export const correctProgressionAnswers = [
  "Dm7",
  "G7",
  "Cmaj7",
  "Fm7",
  "Bbmaj7",
  "Em7",
  "Ebm7",
  "Ab7",
  "Dbmaj7",
  "D#m7",
  "G#maj7",
  "C#m7",
  "Em7",
  "A#7",
  "D#maj7",
  "Abm7",
  "Dbmaj7",
  "Gbm7",
];
