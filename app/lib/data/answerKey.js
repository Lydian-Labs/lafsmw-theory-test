const triadDMajor = ["d", "f#", "a"];
const triadFsharpMajor = ["f#", "a#", "c#"];
const triadDbMinor = ["db", "f", "ab"];
const triadFsharpMinor = ["f#", "a", "c#"];
const triadEbDiminished = ["eb", "gb", "bbb"];
const triadEAugmented = ["e", "g#", "b#"];

const scaleDbMajor = ["db", "eb", "f", "gb", "ab", "bb", "c"];
const scaleBMajor = ["b", "c#", "d#", "e", "f#", "g#", "a#"];
const scaleFSharpDorian = ["f#", "g#", "a", "b", "c#", "d#", "e"];
const scaleCDorian = ["c", "d", "eb", "f", "g", "a", "bb"];
const scaleBbMixolydian = ["bb", "c", "d", "eb", "f", "g", "ab"];
const scaleCSharpMixolydian = ["c#", "d#", "e#", "f#", "g#", "a#", "b"];

const keySignatureDbMajor = ["bb", "eb", "ab", "db", "gb"];
const keySignatureFSharp = ["f#", "c#", "g#", "d#"];
const keySignatureGminor = ["bb", "eb"];
const keySignatureGSharpMinor = ["f#", "c#", "g#", "d#", "a#"];

const chordEmin7flat5 = ["e", "g", "bb", "d"];
const chordGmin7 = ["g", "bb", "d", "f"];
const chordDbdominant7 = ["db", "f", "ab", "c"];
const chordDsharpdim7 = ["d#", "f#", "a", "c"];
const chordDhalfdim7 = ["d", "f", "ab", "c"];
const chordGbaug7 = ["g", "bb", "d#", "f#"];

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
];

export const correctSeventhChordAnswers = ["A", "B", "C", "D", "E", "F", "G"];

export const correctKeySigAnswers = ["db", "a", "f-", "c#-"];

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
