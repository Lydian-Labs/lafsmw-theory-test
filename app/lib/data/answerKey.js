const correctTriad1Answers = ["d/4", "f#/4", "a/4"];
const correctTriad2Answers = ["f#/4", "a#/4", "c#/5"];
const correctTriad3Answers = ["db/4", "f/4", "ab/4"];
const correctTriad4Answers = ["f#/4", "a/4", "c#/5"];
const correctTriad5Answers = ["eb/4", "g/5", "bb/5"];
const correctTriad6Answers = ["e/4", "g#/4", "b#/4"];

const DbMajor = ["db/4", "eb/4", "f/4", "gb/4", "ab/4", "bb/4", "c/5"];
const BMajor = ["b/4", "c#/5", "d#/5", "e/5", "f#/5", "g#/5", "a#/5"];
const FSharpDorian = ["f#/4", "g#/4", "a/4", "b/4", "c#/5", "d#/5", "e/5"];
const CDorian = ["c/4", "d/4", "eb/4", "f/4", "g/4", "a/4", "bb/4"];
const BbMixolydian = ["bb/4", "c/5", "d/5", "eb/5", "f/5", "g/5", "ab/5"];
const CSharpMixolydian = [
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

const Emin7flat5 = ["e/4", "g/4", "bb/4", "d/5"];
const Gmin7 = ["g/4", "bb/5", "d/5", "f/5"];
const Dbdominant7 = ["db/4", "f/4", "ab/4", "c/5"];
const Dsharpdim7 = ["d#/4", "f#/4", "a/4", "c/5"];
const Dhalfdim7 = ["d/4", "f/4", "ab/4", "c/5"];
const Gbaug7 = ["g/4", "bb/4", "d#/5", "f#/5"];
const Ebmindim7 = ["eb/4", "gb/4", "bb/4", "db/5"];

export const correctTriadAnswers = [
  correctTriad1Answers,
  correctTriad2Answers,
  correctTriad3Answers,
  correctTriad4Answers,
  correctTriad5Answers,
  correctTriad6Answers,
];

export const correctScalesAnswers = [
  DbMajor,
  BMajor,
  CDorian,
  FSharpDorian,
  BbMixolydian,
  CSharpMixolydian,
];

export const correctKeySigNotationAnswers = [
  keySignatureDbMajor,
  keySignatureFSharp,
  keySignatureGminor,
  keySignatureGSharpMinor,
];

export const correctSeventhChordNotationAnswers = [
  Emin7flat5,
  Gmin7,
  Dbdominant7,
  Dsharpdim7,
  Dhalfdim7,
  Gbaug7,
  Ebmindim7,
];

export const correctSeventhChordAnswers = ["A", "B", "C", "D", "E", "F", "G"];

export const correctKeySigAnswers = ["b", "e", "a", "d"];

export const correctProgressionAnswers = [
  "Dm7",
  "G7",
  "Cmaj7",
  "Fmaj7",
  "Bm7",
  "Em7",
  "Amaj7",
  "Dmaj7",
  "Gm7",
  "C7",
  "Fmaj7",
  "Bbmaj7",
  "Em7",
  "A7",
  "Dmaj7",
  "Abmaj7",
  "Dbm7",
  "Gbm7",
];
