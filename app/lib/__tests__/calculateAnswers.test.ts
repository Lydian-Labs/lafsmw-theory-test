import {
  checkAndFormat251Answers,
  checkAndFormatKeySigIdentifyAnswers,
  checkAndFormatChordIdentifyAnswers,
  checkAndFormatArrOfArrsAnswers,
  checkAndFormatChordAnswers,
} from "../calculateAnswers";

describe("checkAndFormat251Answers", () => {
  test("should correctly format student answers and calculate score with empty test answers", () => {
    // Test case 1: With only C Major examples in student answers, but empty test answers
    const studentAnswers = ["Cmaj7", "D7", "G7"];
    // In the new structure, regexCorrectAnswers only contains the actual test questions (none in this case)
    const regexCorrectAnswers: RegExp[] = [];
    // nonRegexCorrectAnswers also only contains the actual test answers (none in this case)
    const nonRegexCorrectAnswers: string[] = [];
    const questionType = "251 Chords";

    const result = checkAndFormat251Answers(
      studentAnswers,
      regexCorrectAnswers,
      nonRegexCorrectAnswers,
      questionType
    );

    // Should show score as 0/0 since there are no test questions
    expect(result).toContain("<b>0/0</b>");
    // Should not contain any answers in the formatted list since there are none
    expect(result).not.toContain("<li>Cmaj7, D7, G7</li>");
    expect(result).toContain("<ol>Actual student answers:");
    // Correct answers should be empty since there are none
    expect(result).toContain("<ol>Correct answers:");
  });

  test("should handle answers with both C Major examples and actual test answers", () => {
    // Test case with C Major examples (first 3) and additional answers
    const studentAnswers = ["Cmaj7", "D7", "G7", "Fmaj7", "Bb7", "Ebmaj7"];
    // In the new structure, regexCorrectAnswers only contains the actual test questions
    const regexCorrectAnswers = [/Fmaj7/, /Bb7/, /Ebmaj7/];
    // nonRegexCorrectAnswers also only contains the actual test answers
    const nonRegexCorrectAnswers = ["Fmaj7", "Bb7", "Ebmaj7"];
    const questionType = "251 Chords";

    const result = checkAndFormat251Answers(
      studentAnswers,
      regexCorrectAnswers,
      nonRegexCorrectAnswers,
      questionType
    );

    // Should show score as 3/3 (3 correct answers)
    expect(result).toContain("<b>3/3</b>");
    // Should not contain C Major examples
    expect(result).not.toContain("<li>Cmaj7, D7, G7");
    // Should contain the actual test answers
    expect(result).toContain("<li>Fmaj7, Bb7, Ebmaj7</li>");
    // Correct answers should only include the actual test answers
    expect(result).toContain("<ol>Correct answers:");
    expect(result).toContain("<li>Fmaj7</li><li>Bb7</li><li>Ebmaj7</li>");
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
    expect(result).toContain("<ol>Correct answers: <li>G</li><li>D</li><li>A</li></ol>");
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
    expect(result).toContain("<ol>Correct answers: <li>G</li><li>D</li><li>A</li></ol>");
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
    expect(result).toContain(
      "<ol>Correct answers: <li>Cmaj7</li><li>Dm7</li><li>G7</li></ol>"
    );
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
    expect(result).toContain(
      "<ol>Correct answers: <li>Cmaj7</li><li>Dm7</li><li>G7</li></ol>"
    );
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

  test("should mark missing notes as incorrect", () => {
    const userAnswers = [
      ["Bb", "Eb", "Ab"],
      ["F#", "C#", "G#", "D#", "A#", "E#"],
    ];
    const correctAnswers = [
      ["Bb", "Eb", "Ab", "Db", "Gb"],
      ["F#", "C#", "G#", "D#", "A#", "E#"],
    ];
    const questionType = "Key Signature Notation";

    const result = checkAndFormatArrOfArrsAnswers(
      userAnswers,
      correctAnswers,
      questionType
    );

    expect(result).toContain("<b>1/2</b>");
    expect(result).toContain("<b>(Missing Db)</b>");
    expect(result).toContain("<b>(Missing Gb)</b>");
  });
});

describe("checkAndFormatChordAnswers", () => {
  test("should correctly format student answers and calculate score", () => {
    const userAnswers = [
      ["C", "E", "G"],
      ["D", "F", "A"],
    ];
    const correctAnswersText = ["C, E, G", "D, F, A"];
    const questionType = "Chord Answers";

    const result = checkAndFormatChordAnswers(
      userAnswers,
      correctAnswersText,
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
    const correctAnswersText = ["C, E, G", "D, F, A"];
    const questionType = "Chord Answers";

    const result = checkAndFormatChordAnswers(
      userAnswers,
      correctAnswersText,
      questionType
    );

    expect(result).toContain("<b>1/2</b>");
    expect(result).toContain("<li>C, E, G</li><li><b>D, F#, A</b></li>");
    expect(result).toContain(
      "<ol>Correct answers:<li>C, E, G</li><li>D, F, A</li></ol>"
    );
  });
});

describe("HTML escaping of free-text student answers", () => {
  test("checkAndFormatKeySigIdentifyAnswers escapes markup in student answers", () => {
    const result = checkAndFormatKeySigIdentifyAnswers(
      ["<img src=x onerror=alert(1)>", "G"],
      ["C", "G"],
      "Key Signatures"
    );
    expect(result).not.toContain("<img");
    expect(result).toContain("&lt;img src=x onerror=alert(1)&gt;");
    expect(result).toContain("<b>1/2</b>");
  });

  test("checkAndFormatChordIdentifyAnswers escapes markup in student answers", () => {
    const result = checkAndFormatChordIdentifyAnswers(
      ["<script>bad()</script>"],
      [/Cmaj7/],
      ["Cmaj7"],
      "Seventh Chords"
    );
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });

  test("checkAndFormat251Answers escapes markup but still grades raw input", () => {
    const result = checkAndFormat251Answers(
      ["Cmaj7", "D7", "G7", "<b>x</b>", "Bb7", "Ebmaj7"],
      [/x/, /Bb7/, /Ebmaj7/],
      ["x Bb7 Ebmaj7"],
      "251"
    );
    expect(result).toContain("<b>3/3</b>");
    expect(result).toContain("&lt;b&gt;x&lt;/b&gt;");
  });
});
