export const checkAnswers = (
  answers: string[],
  correctAnswers: string[],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score++;
    }
  });
  result = `score: ${score}/${numAnswers} on the ${questionType} section.`;
  return result;
};

const checkChordNotesTrue = (
  answers: string[],
  correctAnswers: string[]
): boolean => {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== correctAnswers[i]) {
      return false;
    }
  }
  return true;
};

export const createChordAnswer = (
  answerTriads: string[][],
  correctAnswers: string[][],
  questionType: string
): string => {
  let score = 0;
  let result = "";
  let numAnswers = correctAnswers.length;
  for (let i = 0; i < answerTriads.length; i++) {
    if (checkChordNotesTrue(answerTriads[i], correctAnswers[i])) {
      score++;
    }
  }
  result = `score: ${score}/${numAnswers} on the ${questionType} section.`;
  return result;
};
