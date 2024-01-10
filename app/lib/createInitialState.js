export default function createInitialState(numBars) {
  const initialInputState = Array.from({ length: numBars }, (_, index) => ({
    [index]: "",
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return initialInputState;
}
