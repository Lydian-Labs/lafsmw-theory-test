const TIME_SIG = "7/4";
export const NUM_STAVES = 1;
const Y_POSITION_OF_STAVES = 150;
const X_POSITION_OF_STAVES = 10;
const FONT = "Arial";
const FONT_SIZE = 12;
const RENDERER_WIDTH = 480;
const RENDERER_HEIGHT = 140;
const FIRST_STAVE_WIDTH = 460;
export const BEATS_IN_MEASURE = parseInt(TIME_SIG.split("/")[0]);
export const TOLERANCE = 6;
export const INITIAL_STAVES = new Array(NUM_STAVES).fill([]);
export const staveData = {
  font: FONT,
  fontSize: FONT_SIZE,
  numStaves: NUM_STAVES,
  rendererWidth: RENDERER_WIDTH,
  rendererHeight: RENDERER_HEIGHT,
  yPositionOfStaves: Y_POSITION_OF_STAVES,
  xPositionOfStaves: X_POSITION_OF_STAVES,
  firstStaveWidth: FIRST_STAVE_WIDTH,
};
