import React from "react";
import { StaveType } from "../lib/typesAndInterfaces";

const getUserClickInfo = (
  e: React.MouseEvent,
  container: React.RefObject<HTMLDivElement>,
  stave: StaveType
): any => {
  const rect = container && container.current?.getBoundingClientRect();
  const userClickY = rect ? e.clientY - rect.top : 0;
  const userClickX = rect ? e.clientX - rect.left : 0;
  const topStaveYCoord = stave && stave.getYForTopText();
  const bottomStaveYCoord = (stave && stave.getYForBottomText()) || undefined;
  //need to figure out how to NOT hard code 33

  return {
    rect,
    userClickY,
    userClickX,
    topStaveYCoord,
    bottomStaveYCoord,
  };
};

export default getUserClickInfo;
