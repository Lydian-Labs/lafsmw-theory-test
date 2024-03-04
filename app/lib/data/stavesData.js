const CLEF = "treble";
const TIME_SIG = "8/4";
export const NUM_STAVES = 1;
const Y_POSITION_OF_STAVES = 150;
const X_POSITION_OF_STAVES = 10;
const FONT = "Arial";
const FONT_SIZE = 12;
const RENDERER_WIDTH = 800;
const RENDERER_HEIGHT = 300;
const FIRST_STAVE_WIDTH = 600;
const REGULAR_STAVE_WIDTH = 350;

export const question1 = {
  font: FONT,
  fontSize: FONT_SIZE,
  numStaves: NUM_STAVES,
  rendererWidth: RENDERER_WIDTH,
  rendererHeight: RENDERER_HEIGHT,
  yPositionOfStaves: Y_POSITION_OF_STAVES,
  xPositionOfStaves: X_POSITION_OF_STAVES,
  clef: CLEF,
  //timeSig: TIME_SIG,
  firstStaveWidth: FIRST_STAVE_WIDTH,
  //regularStaveWidth: REGULAR_STAVE_WIDTH,
};

export const BEATS_IN_MEASURE = parseInt(TIME_SIG.split("/")[0]);
