import createInitialState from "../createInitialState";

describe("createInitialState", () => {
  test("should create an initial state with the correct number of entries", () => {
    const num = 3;
    const result = createInitialState(num);

    expect(result).toEqual({ 0: "", 1: "", 2: "" });
  });

  test("should create an initial state with an empty object when num is 0", () => {
    const num = 0;
    const result = createInitialState(num);

    expect(result).toEqual({});
  });

  test("should create an initial state with a single entry when num is 1", () => {
    const num = 1;
    const result = createInitialState(num);

    expect(result).toEqual({ 0: "" });
  });

  test("should handle negative numbers by returning an empty object", () => {
    const num = -1;
    const result = createInitialState(num);

    expect(result).toEqual({});
  });

  test("should create an initial state with the correct entries when num is large", () => {
    const num = 1000;
    const result = createInitialState(num);

    const expected = Array.from({ length: num }, (_, index) => ({
      [index]: "",
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

    expect(result).toEqual(expected);
  });
});
