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

export const correctSeventhChordAnswers = [
  /^(E#)(?:dim7|º7)$/i,
  /^(F)(?:∆|∆7|[Mm]aj7|[Mm]a7)$/,
  /^(G)(?:-∆|m∆|m∆7|min[Mm]aj7|mi[Mm]aj7|m[Mm]aj7)$/,
  /^(B7)$/,
  /^(F#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  /^(Ab)(?:-7|min7|mi7|m7)$/,
  /^(D)(?:\+7|7#5|7\(#5\)|[Aa]ug7|)$/,
];

export const correctProgressionAnswers = [
  //1
  /^(F#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  /^(B7)(?:\(?b9\)?|\(?#9b9\)?|\(?b9#9\)?|\(?b13\)?|\(?alt\)?|\(?b13b9\)?|\(?b9b13\)?|\(?b13#9b9\)?||\(?b13b9#9\)?|\(?#9b9b13\)?|\(?b9#9b13\)?|\(?#9b13\)?)$/,
  /^(E)(?:-7|min7|mi7|m7|m6|mi6|min6|-6)$/,
  //2
  /^(Eb)(?:-7|min7|mi7|m7)$/,
  /^(Ab7)$/,
  /^(Db)(?:∆|∆7|[Mm]aj7|[Mm]a7)$/,
  //3
  /^(D#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  /^(G#7)(?:\(?b9\)?|\(?#9b9\)?|\(?b9#9\)?|\(?b13\)?|\(?alt\)?|\(?b13b9\)?|\(?b9b13\)?|\(?b13#9b9\)?||\(?b13b9#9\)?|\(?#9b9b13\)?|\(?b9#9b13\)?|\(?#9b13\)?)$/,
  /^(C#)(?:-7|min7|mi7|m7|m6|mi6|min6|-6)$/,
  //4
  /^(E#)(?:-7|min7|mi7|m7)$/,
  /^(A#7)$/,
  /^(D#)(?:∆|∆7|[Mm]aj7|[Mm]a7)$/,
  //5
  /^(Ab)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  /^(Db)(?:\(?b9\)?|\(?#9b9\)?|\(?b9#9\)?|\(?b13\)?|\(?alt\)?|\(?b13b9\)?|\(?b9b13\)?|\(?b13#9b9\)?||\(?b13b9#9\)?|\(?#9b9b13\)?|\(?b9#9b13\)?|\(?#9b13\)?)$/,
  /^(Gb)(?:-7|min7|mi7|m7|m6|mi6|min6|-6)$/,
];
