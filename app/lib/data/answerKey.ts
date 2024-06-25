//regex patterns for 'identify the following 7th chords'
export const correctSeventhChordAnswers = [
  /^(E#)(?:dim7|º7)$/i,
  /^(F)(?:∆|∆7|[Mm]aj7|[Mm]a7)$/i,
  /^(G)(?:-∆7|-∆|m∆|m∆7|min[Mm]aj7|mi[Mm]aj7|m[Mm]aj7)$/,
  /^(B7)$/,
  /^(F#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  /^(Ab)(?:-7|min7|mi7|m7)$/,
  /^(D)(?:\+7|7#5|7\(#5\)|[Aa]ug7|)$/,
];

const triadDMajor = ["d", "f#", "a"];
const triadFsharpMajor = ["f#", "a#", "c#"];
const triadDbMinor = ["db", "fb", "ab"];
const triadFsharpMinor = ["f#", "a", "c#"];
const triadEbDiminished = ["eb", "gb", "bbb"];
const triadEAugmented = ["e", "g#", "b#", "c"];

export const correctTriads: RegExp[] = [
  /^df#a$/,
  /^f#a#c#$/,
  /^db(?:e|fb)ab$/,
  /^f#ac#$/,
  /^ebgb(?:a|bbb)$/,
  /^eg#(?:b#|c)$/,
];

export const correct7thChordNotationAnswers = [
  /^eg#bd#$/,
  /^gbbdf$/,
  /^dbfab(?:b|cb)$/,
  /^d#f#ac$/,
  /^dfabc$/,
  /^gbbbd(?:fb|e)$/,
  /^ebgbbbd$/,
];

//need to update the logic to allow for either 7 or 8 notes
const scaleDbMajor = ["db", "eb", "f", "gb", "ab", "bb", "c"];
const scaleBMajor = ["b", "c#", "d#", "e", "f#", "g#", "a#"];
const scaleFSharpDorian = ["f#", "g#", "a", "b", "c#", "d#", "e"];
const scaleCDorian = ["c", "d", "eb", "f", "g", "a", "bb"];
const scaleBbMixolydian = ["bb", "c", "d", "eb", "f", "g", "ab"];
const scaleCSharpMixolydian = ["c#", "d#", "e#", "f#", "g#", "a#", "b"];

const keySignatureDbMajor = ["bb", "eb", "ab", "db", "gb"];
const keySignatureFSharp = ["f#", "c#", "g#", "d#", "a", "e"];
const keySignatureGminor = ["bb", "eb"];
const keySignatureGSharpMinor = ["f#", "c#", "g#", "d#", "a#"];

//missing Db-7, D#-7
const chordEmin7flat5 = ["e", "g", "bb", "d"];
const chordGmin7 = ["g", "bb", "d", "f"];
const chordDbdominant7 = ["db", "f", "ab", "c"];
const chordDsharpdim7 = ["d#", "f#", "a", "c"];
const chordDhalfdim7 = ["d", "f", "ab", "c"];
const chordGbaug7 = ["gb", "bb", "d", "e"];

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
