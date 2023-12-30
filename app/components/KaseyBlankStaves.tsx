import VexFlow, { IRenderContext } from "vexflow";
const VF = VexFlow.Flow;
const { Stave, StaveNote, Renderer } = VF;

const KaseyBlankStaves = (
  numStaves: number,
  context: InstanceType<typeof Renderer>,
  firstStaveWidth: number,
  regularStaveWidth: number,
  x: number,
  y: number,
  clef?: string,
  timeSig?: string
) => {
  const stavesArray: {
    stave: InstanceType<typeof Stave>;
    notes: InstanceType<typeof StaveNote>[];
  }[] = [];
  for (let i = 0; i < numStaves; i++) {
    let staveWidth = i === 0 ? firstStaveWidth : regularStaveWidth;
    let stave = new Stave(x, y, staveWidth);
    i === 0 && clef ? stave.addClef(clef) : null;
    i === 0 && timeSig ? stave.addTimeSignature(timeSig) : null;
    i === numStaves - 1 ? stave.setEndBarType(3) : null;
    context ? stave.setContext(context).draw() : null;
    x += staveWidth;
    stavesArray.push({ stave, notes: [] });
  }
  return stavesArray;
};

export default KaseyBlankStaves;
