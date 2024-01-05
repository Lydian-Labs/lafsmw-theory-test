import BlueButton from "../components/BlueButton";

interface RenderButtonProps {
  button,
  text: string
  isActive: boolean;
}

export const renderEraseNotesButton: RenderButtonProps = () => (
  <BlueButton onClick={button} isEnabled={isActive}>
    {eraseNotesText}
  </BlueButton>
);

export const renderEnterNotesButton: RenderButtonProps = () => (
  <BlueButton onClick={button} isEnabled={isActive}>
    {enterNotesText}
  </BlueButton>
);
