// const minorTriads = ["F#minor", "F#min", "F#mi", "F#-"];

// const triads = {
//   min: /^(F#)(?:minor|min|mi|-)$/,
//   maj: /^(D|F#)(?:Major|Maj|\s)$/i,
//   dim: /^(Eb)(?:dim|diminished|º)$/i,
//   aug: /^(E)(aug|augmented|\+)$/i,
// };

const major7th = ["F∆", "F∆7", "FMaj7", "Fmaj7", "Fma7", "FMa7"];
const diminished7th = ["E#dim7", "E#º7"];
const minorMajor7 = ["G-∆7", "G-∆", "Gm∆7", "GminMaj7", "GmiMaj7"];
const dominant7th = ["B7"];
const halfDim7 = ["F#ø7", "F#ø", "F#-7b5", "F#m7b5", "F#min7b5", "F#mi7b5"];
const min7 = ["Ab-7", "Abmin7", "Abmi7", "Abm7"];
const aug7 = ["D+7", "D7#5", "D7(#5)", "Daug7", "DAug7"];

const seventhChords = {
  major7th: /^(F)(?:∆|∆7|Maj7|Ma7)$/i,
  diminished7th: /^(E#)(?:dim7|º7)$/i,
  minorMajor7th: /^(G)(?:-∆7|-∆|m∆|m∆7|min[Mm]aj7|mi[Mm]aj7|m[Mm]aj7)$/,
  dominant7th: /^(B)7/,
  halfDim7: /^(F#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  min7th: /^(Ab)(?:-7|min7|mi7|m7)$/,
  aug7th: /^(D)\s*(?:\+7|7#5|7\(#5\)|[Aa]ug7|)$/,
};



const regexTest = (studentAnswers: string[], regexCorrectAnswers: any) => {
  studentAnswers.forEach((chord) => {
    const result = regexCorrectAnswers.test(chord);
    console.log(`${chord}: ${result} `);
  });
};

export const printRegexResults = () => {
  regexTest(major7th, seventhChords.major7th);
  regexTest(diminished7th, seventhChords.diminished7th);
  regexTest(minorMajor7, seventhChords.minorMajor7th);
  regexTest(dominant7th, seventhChords.dominant7th);
  regexTest(halfDim7, seventhChords.halfDim7);
  regexTest(min7, seventhChords.min7th);
  regexTest(aug7, seventhChords.aug7th);
};
