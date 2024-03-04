import VexFlow, { IRenderContext } from "vexflow";
import { BlankStaves } from "../lib/typesAndInterfaces";
const VF = VexFlow.Flow;
const { Stave } = VF;

const CreateBlankStaves = (
  numStaves: number,
  context: IRenderContext,
  firstStaveWidth: number,
  x: number,
  y: number,
  regularStaveWidth: number,
  clef?: string,
  timeSig?: string,
  keySig?: string
): BlankStaves => {
  const stavesArray: InstanceType<typeof Stave>[] = [];
  if (regularStaveWidth)
    for (let i = 0; i < numStaves; i++) {
      let staveWidth = i === 0 ? firstStaveWidth : regularStaveWidth;
      let stave = new Stave(x, y, staveWidth);
      i === 0 && clef ? stave.addClef(clef) : null;
      i === 0 && timeSig ? stave.addTimeSignature(timeSig) : null;
      i === 0 && keySig ? stave.addKeySignature(keySig) : null;
      i === numStaves - 1 ? stave.setEndBarType(3) : null;
      context ? stave.setContext(context).draw() : null;
      x += staveWidth;
      stavesArray.push(stave);
    }
  else {
    return [];
  }

  return stavesArray;
};

export default CreateBlankStaves;
