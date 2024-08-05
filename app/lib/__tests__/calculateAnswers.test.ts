import {
  checkAndFormat251Answers,
  checkAndFormatKeySigIdentifyAnswers,
  checkAndFormatChordIdentifyAnswers,
  checkAndFormatArrOfArrsAnswers,
  checkAndFormatChordAnswers,
} from "../calculateAnswers";

describe("checkAndFormat251Answers", () => {
  test("should correctly format student answers and calculate score", () => {
    const studentAnswers = ["Cmaj7", "D7", "G7"];
    const regexCorrectAnswers = [/Cmaj7/, /D7/, /G7/];
    const nonRegexCorrectAnswers = ["Cmaj7", "D7", "G7"];
    const questionType = "251 Chords";

    const result = checkAndFormat251Answers(
      studentAnswers,
      regexCorrectAnswers,
      nonRegexCorrectAnswers,
      questionType
    );

    expect(result).toContain("<b>3/3</b>");
    expect(result).toContain("<li>Cmaj7, D7, G7</li>");
  });
});

describe("checkAndFormatKeySigIdentifyAnswers", () => {
  test("should correctly format student answers and calculate score", () => {
    const answers = ["G", "D", "A"];
    const correctAnswers = ["G", "D", "A"];
    const questionType = "Key Signature Identification";

    const result = checkAndFormatKeySigIdentifyAnswers(
      answers,
      correctAnswers,
      questionType
    );

    expect(result).toContain("<b>3/3</b>");
    expect(result).toContain("<li>G</li><li>D</li><li>A</li>");
    expect(result).toContain("<ul>Correct answers: G, D, A</ul>");
  });

  test("should handle incorrect student answers", () => {
    const answers = ["G", "C", "A"];
    const correctAnswers = ["G", "D", "A"];
    const questionType = "Key Signature Identification";

    const result = checkAndFormatKeySigIdentifyAnswers(
      answers,
      correctAnswers,
      questionType
    );

    expect(result).toContain("<b>2/3</b>");
    expect(result).toContain("<li>G</li><li><b>C</b></li><li>A</li>");
    expect(result).toContain("<ul>Correct answers: G, D, A</ul>");
  });
});

describe("checkAndFormatChordIdentifyAnswers", () => {
  test("should correctly format student answers and calculate score", () => {
    const studentAnswers = ["Cmaj7", "Dm7", "G7"];
    const regexCorrectAnswers = [/Cmaj7/, /Dm7/, /G7/];
    const nonRegexCorrectAnswers = ["Cmaj7", "Dm7", "G7"];
    const questionType = "Chord Identification";

    const result = checkAndFormatChordIdentifyAnswers(
      studentAnswers,
      regexCorrectAnswers,
      nonRegexCorrectAnswers,
      questionType
    );

    expect(result).toContain("<b>3/3</b>");
    expect(result).toContain("<li>Cmaj7</li><li>Dm7</li><li>G7</li>");
    expect(result).toContain("<ul>Correct answers: Cmaj7, Dm7, G7</ul>");
  });

  test("should handle incorrect student answers", () => {
    const studentAnswers = ["Cmaj7", "D7", "Gmaj7"];
    const regexCorrectAnswers = [/Cmaj7/, /Dm7/, /G7/];
    const nonRegexCorrectAnswers = ["Cmaj7", "Dm7", "G7"];
    const questionType = "Chord Identification";

    const result = checkAndFormatChordIdentifyAnswers(
      studentAnswers,
      regexCorrectAnswers,
      nonRegexCorrectAnswers,
      questionType
    );

    expect(result).toContain("<b>1/3</b>");
    expect(result).toContain(
      "<li>Cmaj7</li><li><b>D7</b></li><li><b>Gmaj7</b></li>"
    );
    expect(result).toContain("<ul>Correct answers: Cmaj7, Dm7, G7</ul>");
  });
});

describe("checkAndFormatArrOfArrsAnswers", () => {
  test("should correctly format student answers and calculate score", () => {
    const userAnswers = [
      ["C", "E", "G"],
      ["D", "F", "A"],
    ];
    const correctAnswers = [
      ["C", "E", "G"],
      ["D", "F", "A"],
    ];
    const questionType = "Array of Arrays Identification";

    const result = checkAndFormatArrOfArrsAnswers(
      userAnswers,
      correctAnswers,
      questionType
    );

    expect(result).toContain("<b>2/2</b>");
    expect(result).toContain("<li>C, E, G</li><li>D, F, A</li>");
    expect(result).toContain(
      "<ol>Correct answers:<li>C, E, G</li><li>D, F, A</li></ol>"
    );
  });

  test("should handle incorrect student answers", () => {
    const userAnswers = [
      ["C", "E", "G"],
      ["D", "F#", "A"],
    ];
    const correctAnswers = [
      ["C", "E", "G"],
      ["D", "F", "A"],
    ];
    const questionType = "Array of Arrays Identification";

    const result = checkAndFormatArrOfArrsAnswers(
      userAnswers,
      correctAnswers,
      questionType
    );

    expect(result).toContain("<b>1/2</b>");
    expect(result).toContain(
      "<ol>Correct answers:<li>C, E, G</li><li>D, F, A</li></ol>"
    );
  });
});

describe("checkAndFormatChordAnswers", () => {
  test("should correctly format student answers and calculate score", () => {
    const userAnswers = [
      ["C", "E", "G"],
      ["D", "F", "A"],
    ];
    const correctAnswers = [/CEG/, /DFA/];
    const correctAnswersText = ["C, E, G", "D, F, A"];
    const questionType = "Chord Answers";

    const result = checkAndFormatChordAnswers(
      userAnswers,
      correctAnswers,
      correctAnswersText,
      questionType
    );

    expect(result).toContain("<b>2/2</b>");
    expect(result).toContain("<li>C, E, G</li><li>D, F, A</li>");
    expect(result).toContain("<ol>Correct answers: C, E, G, D, F, A</ol>");
  });

  test("should handle incorrect student answers", () => {
    const userAnswers = [
      ["C", "E", "G"],
      ["D", "F#", "A"],
    ];
    const correctAnswers = [/CEG/, /DFA/];
    const correctAnswersText = ["C, E, G", "D, F, A"];
    const questionType = "Chord Answers";

    const result = checkAndFormatChordAnswers(
      userAnswers,
      correctAnswers,
      correctAnswersText,
      questionType
    );

    expect(result).toContain("<b>1/2</b>");
    expect(result).toContain("<li>C, E, G</li><li><b>D, F#, A</b></li>");
    expect(result).toContain("<ol>Correct answers: C, E, G, D, F, A</ol>");
  });
});
