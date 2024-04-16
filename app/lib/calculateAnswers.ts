export default function calculateAnswers(
  answers: string[],
  correctAnswers: string[]
): number {
  let score = 0;
  let numAnswers = correctAnswers.length;
  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score++;
    }
  });
  console.log(`score: ${score}/${numAnswers}`);
  return score;
}
