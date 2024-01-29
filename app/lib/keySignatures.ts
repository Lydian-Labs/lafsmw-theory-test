export const sharpKeySignature = (numFlats: number) => {
  let keySig;
  switch (numFlats) {
    case (numFlats = 1):
      keySig = "G";
      break;
    case (numFlats = 2):
      keySig = "D";
      break;
    case (numFlats = 3):
      keySig = "A";
      break;
    case (numFlats = 4):
      keySig = "E";
      break;
    case (numFlats = 5):
      keySig = "B";
      break;
    case (numFlats = 6):
      keySig = "F#";
      break;
    case (numFlats = 7):
      keySig = "C#";
      break;
    default:
      keySig = "C";
  }
  return keySig;
};
export const flatKeySignature = (numFlats: number) => {
  let keySig;
  switch (numFlats) {
    case (numFlats = 1):
      keySig = "F";
      break;
    case (numFlats = 2):
      keySig = "Bb";
      break;
    case (numFlats = 3):
      keySig = "Eb";
      break;
    case (numFlats = 4):
      keySig = "Ab";
      break;
    case (numFlats = 5):
      keySig = "Db";
      break;
    case (numFlats = 6):
      keySig = "Gb";
      break;
    case (numFlats = 7):
      keySig = "Cb";
      break;
    default:
      keySig = "C";
  }
  return keySig;
};
