// The function createInitialState is a utility function that creates an initial state object, with a certain amount of numbered properties based on the number passed in as an argument. This initial state is an object where each key is the index and the corresponding value is an empty string.

// The function uses Array.from to create an array of "num" length. For each item in the array, it creates an object where the key is the index and the value is an empty string.

// The reduce function is then used to merge all these individual objects into one single object. The reduce function takes two arguments: an accumulator (acc) and the current value (curr). For each iteration, it returns a new object that spreads the properties of the accumulator and the current value. This effectively merges the current object into the accumulator.

// The initial value for the accumulator is an empty object ({}), so the result of the reduce function is an object that combines all the individual objects created by Array.from.

// The final result is an object where each key is a bar index and each value is an empty string. This object represents the initial state for the componenent in which it is used.

export default function createInitialState(num: number) {
  const initialInputState = Array.from({ length: num }, (_, index) => ({
    [index]: "",
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return initialInputState;
}
