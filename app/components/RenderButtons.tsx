import BlueButton from "./BlueButton";

export const renderBlueButton = (
  buttonFunction: () => void,
  buttonText: string,
  state?: boolean
) => (
  <BlueButton onClick={buttonFunction} isEnabled={state}>
    {buttonText}
  </BlueButton>
);
