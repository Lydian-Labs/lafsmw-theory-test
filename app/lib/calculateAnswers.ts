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

export const checkAndFormatKeySigIdentifyAnswers = (
  answers: string[],
  correctAnswers: string[],
  keySigText: string[],
  questionType: string
): string => {
  let score = 0;
  let answersHTML = "";
  let keySigTextString = keySigText.join(", ");

  for (let i = 0; i < correctAnswers.length; i++) {
    let studentAnswer = answers[i] || "";
    let isCorrect =
      studentAnswer.toLowerCase() === correctAnswers[i].toLowerCase();

    if (isCorrect) {
      score++;
      answersHTML += `<li>${studentAnswer}</li>`;
    } else {
      answersHTML += `<li><b>${
        studentAnswer || "(No answer provided)"
      }</b></li>`;
    }
  }

  const result = `<b>${score}/${correctAnswers.length}</b> on the ${questionType} section.
    <ol>Actual student answers: ${answersHTML}</ol>
    <ul>Correct answers: ${keySigTextString}</ul>`;

  return result;
};

export const checkAndFormatChordIdentifyAnswers = (
  studentAnswers: string[],
  regexCorrectAnswers: RegExp[],
  nonRegexCorrectAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let studentAnswersHTML = "";
  let correctAnswers = nonRegexCorrectAnswers.join(", ");

  for (let i = 0; i < regexCorrectAnswers.length; i++) {
    let chord = studentAnswers[i] || "";
    let isCorrect = regexCorrectAnswers[i].test(chord);

    if (isCorrect) {
      score++;
      studentAnswersHTML += `<li>${chord}</li>`;
    } else {
      studentAnswersHTML += `<li><b>${
        chord || "(No answer provided)"
      }</b></li>`;
    }
  }

  const result = `<b>${score}/${regexCorrectAnswers.length}</b> on the ${questionType} section.
    <ol>Actual student answers:${studentAnswersHTML}</ol>
    <ul>Correct answers: ${correctAnswers}</ul>`;

  return result;
};

export const checkAndFormatArrOfArrsAnswers = (
  userAnswers: string[][],
  correctAnswers: string[][],
  questionType: string
): string => {
  let score = 0;
  let actualStudentAnswers = "";
  let correctHTMLAnswers = "";

  for (let i = 0; i < correctAnswers.length; i++) {
    if (!userAnswers[i] || !userAnswers[i].length) {
      actualStudentAnswers += `<li><b>(No answer provided)</b></li>`;
    } else {
      let isCorrect = true;
      let formattedUserAnswer = userAnswers[i]
        .map((answer, j) => {
          const userNote = answer.split("/")[0];
          const correctNote = correctAnswers[i][j];
          if (userNote !== correctNote) {
            isCorrect = false;
            return `<b>${userNote}</b>`;
          }
          return userNote;
        })
        .join(", ");

      if (isCorrect) score++;
      actualStudentAnswers += `<li>${formattedUserAnswer}</li>`;
    }

    correctHTMLAnswers += `<li>${correctAnswers[i].join(", ")}</li>`;
  }

  const result = `<b>${score}/${correctAnswers.length}</b> on the ${questionType} section.
    <ol>Actual student answers:${actualStudentAnswers}</ol>
    <ol>Correct answers:${correctHTMLAnswers}</ol>`;

  return result;
};

export const checkAndFormatChordAnswers = (
  userAnswers: string[][],
  correctAnswers: RegExp[],
  correctAnswersText: string[],
  questionType: string
): string => {
  let score = 0;
  let actualStudentAnswers = "";
  let correctAnswersString = correctAnswersText.join(", ");

  for (let i = 0; i < correctAnswers.length; i++) {
    if (!userAnswers[i] || !userAnswers[i].length) {
      actualStudentAnswers += `<li><b>(No answer provided)</b></li>`;
    } else {
      let answerString = userAnswers[i]
        .map((note) => note.split("/")[0])
        .join("");
      let isCorrect = correctAnswers[i].test(answerString);

      if (isCorrect) {
        score++;
        actualStudentAnswers += `<li>${answerString}</li>`;
      } else {
        actualStudentAnswers += `<li><b>${answerString}</b></li>`;
      }
    }
  }

  const result = `<b>${score}/${correctAnswers.length}</b> on the ${questionType} section.
    <ol>Actual student answers:${actualStudentAnswers}</ol>
    <ol>Correct answers: ${correctAnswersString}</ol>`;

  return result;
};

function arrToString(arr: string[]): string {
  return arr.join(", ");
}
