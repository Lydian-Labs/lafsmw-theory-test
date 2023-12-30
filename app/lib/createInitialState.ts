export default function createInitialState(numBars: number) {
  const initialInputState = Array.from({ length: numBars }, (_, index) => ({
    [index]: "",
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return initialInputState;
}
