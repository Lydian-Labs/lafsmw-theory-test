import VexFlow, { RenderContext } from "vexflow";
const VF = VexFlow.Flow;
const { Stave, StaveNote } = VF;

const KaseyBlankStaves = (
  numStaves: number,
  context: InstanceType<typeof RenderContext>,
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
    i === 0 && clef ? stave.setClef(clef) : null;
    i === 0 && timeSig ? stave.setTimeSignature(timeSig) : null;
    i === numStaves - 1 ? stave.setEndBarType(3) : null;
    context ? stave.setContext(context).draw() : null;
    x += staveWidth;
    stavesArray.push({ stave, notes: [] });
  }
  return stavesArray;
};

export default KaseyBlankStaves;