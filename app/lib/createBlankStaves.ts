import VexFlow from "vexflow";
import { BlankStaves, CreateBlankStavesParams } from "./typesAndInterfaces";
const VF = VexFlow.Flow;
const { Stave } = VF;

const createBlankStaves = (
  params: CreateBlankStavesParams,
  {
    numStaves,
    context,
    firstStaveWidth,
    x,
    y,
    regularStaveWidth,
    chosenClef: clef,
    timeSig,
    keySig,
  } = params
): BlankStaves => {
  const spaceAboveStaff = { space_above_staff_ln: -10 };
  const stavesArray: InstanceType<typeof Stave>[] = [];
  if (regularStaveWidth)
    for (let i = 0; i < numStaves; i++) {
      let staveWidth = i === 0 ? firstStaveWidth : regularStaveWidth;
      let stave = new Stave(x, y, staveWidth, spaceAboveStaff);
      i === 0 && clef ? stave.addClef(clef) : null;
      i === 0 && timeSig ? stave.addTimeSignature(timeSig) : null;
      i === 0 && keySig ? stave.addKeySignature(keySig) : null;
      i === numStaves - 1 ? stave.setEndBarType(3) : null;
      context ? stave.setContext(context).draw() : null;
      x += staveWidth;
      stavesArray.push(stave);
      if (i === 0 && clef) {
        const clefElement = stave.getContext();
        console.log(clefElement);
      }
    }
  else {
    return [];
  }

  return stavesArray;
};

export default createBlankStaves;

/* //VF is a variable that represents the entire vexflow library
var VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named 'app'| VF.Renderer.Backends.SVG = 3, div = 'app'
const div = document.getElementById('app');
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context--resize = the svg bounding box dimensions, 1st arg is x cordinate width
renderer.resize(700, 700);
var context = renderer.getContext();

// add css styles to the svg context--optional--
context.setFont('arial', 10, '').setBackgroundFillStyle('#eed');
const scale = 2.5;
const originalSpacing = 10;
// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(20, 20, 600, {
  spacing_between_lines_px: originalSpacing * scale,
});

// Add a clef and time signature.
stave.addClef('treble').addTimeSignature('4/4');

setTimeout(() => {
  const svgPaths = document.querySelector('svg');
  const paths = svgPaths.querySelectorAll('path');
  const clefPath = paths[5];
  const timeSigPathTop = paths[6];
  const timeSigPathBottom = paths[7];
  const additionalSpacingForClef = 17;
  //clef path
  const clefPathBBox = clefPath.getBBox();
  const centerX = clefPathBBox.x + clefPathBBox.width / 2;
  const centerY = clefPathBBox.y + clefPathBBox.height / 2;
  const translateX = centerX * (1 - scale) + additionalSpacingForClef;
  const translateY = centerY * (1 - scale);
  clefPath.setAttribute(
    'transform',
    `translate(${translateX}, ${translateY}) scale(${scale})`
  );

 

  //time sig top path
  const additionalSpacingForTimeSig = 33
  const timeSigTopBBox = timeSigPathTop.getBBox();
  const timeSigTopCenterX = timeSigTopBBox.x + timeSigTopBBox.width / 2;
  const timeSigTopCenterY = timeSigTopBBox.y + timeSigTopBBox.width / 2;
  const timeSigTopTranslateX =
    timeSigTopCenterX * (1 - scale) + additionalSpacingForTimeSig;
  const timeSigTopTranslateY = timeSigTopCenterY * (1 - scale);
  timeSigPathTop.setAttribute(
    'transform',
    `translate(${timeSigTopTranslateX}, ${timeSigTopTranslateY}) scale(${scale})`
  );

  //time sig bottom path
  const timeSigBottomBBox = timeSigPathBottom.getBBox();
  const timeSigBottomCenterX =
    timeSigBottomBBox.x + timeSigBottomBBox.width / 2;
  const timeSigBottomCenterY =
    timeSigBottomBBox.y + timeSigBottomBBox.width / 2;
  const timeSigBottomTranslateX =
    timeSigBottomCenterX * (1 - scale) + additionalSpacingForTimeSig;
  const timeSigBottomTranslateY = timeSigBottomCenterY * (1 - scale);

  timeSigPathBottom.setAttribute(
    'transform',
    `translate(${timeSigBottomTranslateX}, ${timeSigBottomTranslateY}) scale(${scale})`
  );

  console.log(timeSigBottomBBox);
});

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

console.log(stave);
 */
