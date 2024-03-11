export const sharpKeySignature = (numSharps: number) => {
  let keySig;
  switch (numSharps) {
    case (numSharps = 1):
      keySig = "G";
      break;
    case (numSharps = 2):
      keySig = "D";
      break;
    case (numSharps = 3):
      keySig = "A";
      break;
    case (numSharps = 4):
      keySig = "E";
      break;
    case (numSharps = 5):
      keySig = "B";
      break;
    case (numSharps = 6):
      keySig = "F#";
      break;
    case (numSharps = 7):
      keySig = "C#";
      break;
    default:
      keySig = "C";
  }
  return keySig;
};

export const sharpKeyYPositions = (
  userYClick: number,
  topStaveYPos: number, //180
  spacingBetweenLines: number //10
) => {
  let note;
  if (Math.abs(userYClick - (topStaveYPos + spacingBetweenLines)) <= 1) {
    note = "F#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + (spacingBetweenLines * 2 + 5))) <= 1
  ) {
    note = "C#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + spacingBetweenLines - 5)) <= 1
  ) {
    note = "G#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + spacingBetweenLines * 2)) <= 1
  ) {
    note = "D#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + (spacingBetweenLines * 3 + 5))) <= 1
  ) {
    note = "A#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + spacingBetweenLines + 5)) <= 1
  ) {
    note = "E#";
  } else if (
    Math.abs(userYClick - (topStaveYPos + spacingBetweenLines * 3)) <= 1
  ) {
    note = "B#";
  } else {
    note = "none";
  }
  return note;
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
