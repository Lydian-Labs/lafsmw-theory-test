import { StaveType } from "./typesAndInterfaces";

const isClickWithinStaveBounds = (
  stave: StaveType,
  topStaveMaxYClick: number,
  bottomStaveMaxYClick: number | undefined,
  userClickX: number,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const measureWidth = stave.getWidth();
  const maxRightClick = measureWidth * 0.6;
  const minLeftClick = measureWidth * 0.08;
  const minTopClick = topStaveMaxYClick;
  const maxBottomClick = bottomStaveMaxYClick;

  if (
    typeof maxBottomClick === "undefined" ||
    userClickX < minLeftClick ||
    userClickX > maxRightClick ||
    userClickX < minTopClick ||
    userClickX > maxBottomClick
  ) {
    setMessage(
      "Your click was outside the valid stave area. Please click within the stave bounds."
    );
    setOpen(true);
  }
};

export default isClickWithinStaveBounds;
