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
  const topStaveYCoord = stave && stave.getYForTopText();
  const bottomStaveYCoord = (stave && stave.getYForBottomText()) || undefined;
  const highGYPosition = topStaveYCoord - 33;
  return {
    rect,
    userClickY,
    userClickX,
    topStaveYCoord,
    bottomStaveYCoord,
    highGYPosition,
  };
};

export default getUserClickInfo;
