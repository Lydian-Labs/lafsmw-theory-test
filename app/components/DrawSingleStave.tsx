import VexFlow, { IRenderContext } from "vexflow";
const VF = VexFlow.Flow;
const { Stave } = VF;

export const DrawStave = (
  context: IRenderContext,
  x: number,
  y: number,
  width: number,
  clef?: string,
  timeSig?: string
) => {
  const newStave = new Stave(x, y, width);
  clef && newStave.addClef(clef);
  timeSig && newStave.addTimeSignature(timeSig);
  context && newStave.setContext(context).draw();
  return newStave;
};
