import { StaveType } from "./typesAndInterfaces";
const isClickWithinStaveBounds = (
  stave: StaveType,
  topStaveMaxYClick: number,
  bottomStaveMaxYClick: number | undefined
) => {
  const measureWidth = stave.getWidth();
  const maxRightClick = measureWidth * 0.6;
  const minLeftClick = measureWidth * 0.08;
  const minTopClick = topStaveMaxYClick;
  const maxBottomClick = bottomStaveMaxYClick;

  return {
    maxRightClick,
    minLeftClick,
    minTopClick,
    maxBottomClick,
  };
};

export default isClickWithinStaveBounds;
