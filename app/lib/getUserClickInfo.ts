import React from "react";
import { UserClickInfo, StaveType } from "../lib/typesAndInterfaces";

export const getUserClickInfo = (
  e: React.MouseEvent,
  container: React.RefObject<HTMLDivElement>,
  stave: StaveType
): UserClickInfo => {
  const rect = container && container.current?.getBoundingClientRect();
  const userClickY = rect ? e.clientY - rect.top : 0;
  const userClickX = rect ? e.clientX - rect.left : 0;
  const topStaveYPosition = stave && stave.getYForTopText();
  const bottomY = stave && stave.getBottomY();
  const bottomLineY = stave && stave.getBottomLineY();
  const spacingBetweenLines = stave && stave.getSpacingBetweenLines();

  const highGYPosition = topStaveYPosition - 33;

  return {
    rect,
    userClickY,
    userClickX,
    topStaveYPosition,
    bottomY,
    bottomLineY,
    spacingBetweenLines,
    highGYPosition,
  };
};

export default getUserClickInfo;
