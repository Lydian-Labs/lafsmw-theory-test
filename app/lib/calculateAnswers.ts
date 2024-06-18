export const checkProgressionAnswers = (
  answers: string[],
  correctAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].toLowerCase() === correctAnswers[i].toLowerCase()) {
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
    if (answers[i].toLowerCase() === correctAnswers[i].toLowerCase()) {
      score++;
    }
  }
  result = `${score}/${numAnswers} on the ${questionType} section.
    <ul>Actual student answers:
      <li>${answers}</li>
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
    let current = userAnswers[i].join(", ");
    result += `<li>${i + 1}. ${current}</li>`;
  }
  return result;
}
