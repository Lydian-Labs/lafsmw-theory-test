export const check251Answers = (
  studentAnswers: string[],
  regexCorrectAnswers: RegExp[],
  keyNames: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = studentAnswers.length;
  let keyNamesString = arrToString(keyNames);
  for (let i = 0; i < studentAnswers.length; i++) {
    let chord = studentAnswers[i];
    let isTrue = regexCorrectAnswers[i].test(chord);
    if (isTrue) {
      score++;
    }
  }
  result = `<b>${score}/${numAnswers}</b> on the ${questionType} section.
    <ul>Actual student answers:
      <li>${arrToString(studentAnswers.slice(0, 3))}</li>
      <li>${arrToString(studentAnswers.slice(3, 6))}</li>
      <li>${arrToString(studentAnswers.slice(6, 9))}</li>
      <li>${arrToString(studentAnswers.slice(9, 12))}</li>
      <li>${arrToString(studentAnswers.slice(12, 15))}</li>
      <li>${arrToString(studentAnswers.slice(15, 18))}</li>
    </ul>
    <ul>Correct answers: ${keyNamesString}</ul>`;
  return result;
};

export const checkKeySigIdentifyAnswers = (
  answers: string[],
  correctAnswers: string[],
  keySigText: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  let keySigTextString = arrToString(keySigText);
  let answersHTML = convertArrStringsToHTML(answers);
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].toLowerCase() === correctAnswers[i]) {
      score++;
    }
  }
  result = `<b>${score}/${numAnswers}</b> on the ${questionType} section.
    <ol>Actual student answers: ${answersHTML}</ol>
    <ul>Correct answers: ${keySigTextString}</ul>`;
  return result;
};

export const checkChordIdentifyAnswers = (
  studentAnswers: string[],
  regexCorrectAnswers: RegExp[],
  nonRegexCorrectAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = studentAnswers.length;
  let correctAnswers = arrToString(nonRegexCorrectAnswers);
  let studentAnswersHTML = convertArrStringsToHTML(studentAnswers);
  for (let i = 0; i < studentAnswers.length; i++) {
    let chord = studentAnswers[i];
    let isTrue = regexCorrectAnswers[i].test(chord);
    if (isTrue) {
      score++;
    }
  }
  result = `<b>${score}/${numAnswers}</b> on the ${questionType} section.
    <ol>Actual student answers:${studentAnswersHTML}</ol>
    <ul>Correct answers: ${correctAnswers}</ul>`;
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
  let actualStudentAnswers = convertStudentAnswersToHTML(userAnswers);
  let correctHTMLAnswers = convertStudentAnswersToHTML(correctAnswers);
  for (let i = 0; i < userAnswers.length; i++) {
    if (!userAnswers[i].length) {
      continue;
    }
    if (checkArrNotesTrue(userAnswers[i], correctAnswers[i])) {
      score++;
    }
  }
  result = `<b>${score}/${numAnswers}</b> on the ${questionType} section.
    <ol>Actual student answers:${actualStudentAnswers}</ol>
    <ol>Correct answers:${correctHTMLAnswers}</ol>`;
  return result;
};

export const checkChordsAnswers = (
  userAnswers: string[][],
  correctAnswers: RegExp[],
  correctAnswersText: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  let correctAnswersString = arrToString(correctAnswersText);
  let actualStudentAnswers = convertStudentAnswersToHTML(userAnswers);
  for (let i = 0; i < userAnswers.length; i++) {
    if (!userAnswers[i].length) {
      continue;
    }
    if (checkChordNotesRegexTrue(userAnswers[i], correctAnswers[i])) {
      score++;
    }
  }
  result = `<b>${score}/${numAnswers}</b> on the ${questionType} section.
    <ol>Actual student answers:${actualStudentAnswers}</ol>
    <ol>Correct answers: ${correctAnswersString}</ol>`;
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

function checkChordNotesRegexTrue(
  chordNotes: string[],
  correctChordNotes: RegExp
): boolean {
  let answerString = "";
  for (let i = 0; i < chordNotes.length; i++) {
    answerString += chordNotes[i].split("/")[0];
  }
  return correctChordNotes.test(answerString);
}

function convertStudentAnswersToHTML(userAnswers: string[][]): string {
  let result = "";
  for (let i = 0; i < userAnswers.length; i++) {
    for (let j = 0; j < userAnswers[i].length; j++) {
      userAnswers[i][j] = userAnswers[i][j].split("/")[0];
    }
    let current = arrToString(userAnswers[i]);
    result += `<li>${current}</li>`;
  }
  return result;
}

function convertArrStringsToHTML(userAnswers: string[]): string {
  let result = "";
  for (let i = 0; i < userAnswers.length; i++) {
    result += `<li>${userAnswers[i]}</li>`;
  }
  return result;
}

function arrToString(arr: string[]): string {
  return arr.join(", ");
}
