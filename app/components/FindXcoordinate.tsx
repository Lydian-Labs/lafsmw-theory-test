const FindXcoordinate = (
  x: number,
  num1: number,
  num2: number,
  num3: number
) => {
  let staveIndex: number;
  if (x < num1) {
    staveIndex = 0;
  } else if (x < num2) {
    staveIndex = 1;
  } else if (x < num3) {
    staveIndex = 2;
  } else {
    staveIndex = 3;
  }
  return staveIndex;
};

export default FindXcoordinate;
