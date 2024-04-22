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
