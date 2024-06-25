const seventhChords = {
  major7th: /^(F)(?:∆|∆7|Maj7|Ma7)$/i,
  diminished7th: /^(E#)(?:dim7|º7)$/i,
  minorMajor7th: /^(G)(?:-∆7|-∆|m∆|m∆7|min[Mm]aj7|mi[Mm]aj7|m[Mm]aj7)$/,
  dominant7th: /^(B)7/,
  halfDim7: /^(F#)(?:ø|ø7|-7b5|m7b5|min7b5|mi7b5)$/,
  min7th: /^(Ab)(?:-7|min7|mi7|m7)$/,
  aug7th: /^(D)\s*(?:\+7|7#5|7\(#5\)|[Aa]ug7|)$/,
};

export const checkProgressionAnswers = (
  answers: string[],
  correctAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].toLowerCase() === correctAnswers[i]?.toLowerCase()) {
      score++;
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:
      <li>${answers.slice(0, 3)}</li>
      <li>${answers.slice(3, 6)}</li>
      <li>${answers.slice(6, 9)}</li>
    </ul>`;
  return result;
};

export const checkAnswers = (
  answers: string[],
  correctAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].toLowerCase() === correctAnswers[i]?.toLowerCase()) {
      score++;
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:
      <li>${answers}</li>
    </ul>`;
  console.log("result: ", result);
  return result;
};

export const checkRegexAnswers = (
  studentAnswers: string[],
  regexCorrectAnswers: RegExp[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = studentAnswers.length;
  for (let i = 0; i < studentAnswers.length; i++) {
    let chord = studentAnswers[i];
    let isTrue = regexCorrectAnswers[i].test(chord);
    if (isTrue) {
      console.log("answer correct");
      score++;
    } else {
      console.log("not a correct answer");
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:
      <li>${studentAnswers}</li>
    </ul>`;
  return result;
};

export const checkArrOfArrsAnswer = (
  userAnswers: string[][],
  correctAnswers: string[][],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  let actualStudentAnswers = prepareArrOfArrsAnswer(userAnswers);
  for (let i = 0; i < userAnswers.length; i++) {
    if (!userAnswers[i].length) {
      continue;
    }
    if (checkArrNotesTrue(userAnswers[i], correctAnswers[i])) {
      score++;
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:${actualStudentAnswers}</ul>`;
  console.log("result: ", result);
  return result;
};

export const checkArrOfArrsRegexAnswer = (
  studentAnswers: string[][],
  correctRegexAnswers: RegExp[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctRegexAnswers.length;
  let actualStudentAnswers = prepareArrOfArrsAnswer(studentAnswers);
  for (let i = 0; i < studentAnswers.length; i++) {
    let triad = studentAnswers[i].join("");
    let isTrue = correctRegexAnswers[i].test(triad);
    if (!studentAnswers[i].length) {
      continue;
    }
    if (isTrue) {
      console.log("regex test passed");
      score++;
    } else {
      console.log("regex test did not pass");
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:${actualStudentAnswers}</ul>`;
  console.log("result: ", result);
  return result;
};

function checkArrNotesTrue(
  answers: string[],
  correctAnswers: string[]
): boolean {
  for (let i = 0; i < answers.length; i++) {
    let currentAnswer = answers[i].split("/")[0];
    if (currentAnswer !== correctAnswers[i]) {
      return false;
    }
  }
  return true;
}

function prepareArrOfArrsAnswer(userAnswers: string[][]): string {
  let result = "";
  for (let i = 0; i < userAnswers.length; i++) {
    for (let j = 0; j < userAnswers[i].length; j++) {
      userAnswers[i][j] = userAnswers[i][j].split("/")[0];
    }
    let current = userAnswers[i].join(", ");
    result += `<li>${i + 1}. ${current}</li>`;
  }
  return result;
}
