const findBar = (
  userClickXCoordinate: number,
  lengthOfBar1: number,
  lengthOfBar2: number,
  lengthOfBar3: number
) => {
  let staveIndex: number;

  if (userClickXCoordinate < lengthOfBar1) {
    staveIndex = 0;
  } else if (userClickXCoordinate < lengthOfBar2) {
    staveIndex = 1;
  } else if (userClickXCoordinate < lengthOfBar3) {
    staveIndex = 2;
  } else {
    staveIndex = 3;
  }
  return staveIndex;
};

export default findBar;
