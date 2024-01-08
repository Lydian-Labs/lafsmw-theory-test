import BlueButton from "./BlueButton";
import VexFlow, { IRenderContext } from "vexflow";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;

export const renderBlueButton = (
  buttonFunction: () => void,
  buttonText: string,
  state?: boolean
) => (
  <BlueButton onClick={buttonFunction} isEnabled={state}>
    {buttonText}
  </BlueButton>
);
