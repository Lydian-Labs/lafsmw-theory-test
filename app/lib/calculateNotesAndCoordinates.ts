import React from "react";
import { NotesAndCoordinatesData, StaveType } from "./typesAndInterfaces";
import generateYMinAndYMaxForKeySig from "./generateYMinAndMaxForKeySig";

const helperFunction = (
  newStaves: StaveType[],
  index: number,
  clefLineNumber: number,
  tolerance: number = 2
) => {
  const spacingBetweenLinesAndSpaces =
    newStaves[index].getSpacingBetweenLines() / 2;
  const topLineCoordinate = newStaves[index].getYForLine(clefLineNumber);

  return topLineCoordinate - spacingBetweenLinesAndSpaces - tolerance;
};

const calculateNotesAndCoordinates = (
  clef: string,
  setNotesAndCoordinates: React.Dispatch<
    React.SetStateAction<NotesAndCoordinatesData[]>
  >,
  newStaves: StaveType[],
  notesArray: string[],
  index: number,
  bassClefLineNumber: number,
  trebleClefLineNumber: number
): void => {
  if (newStaves && newStaves.length > 0) {
    if (clef === "bass") {
      const minimumYCoordinate = helperFunction(
        newStaves,
        index,
        bassClefLineNumber
      );
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(minimumYCoordinate, notesArray)
      );
    } else if (clef === "treble") {
      const minimumYCoordinate = helperFunction(
        newStaves,
        index,
        trebleClefLineNumber
      );
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(minimumYCoordinate, notesArray)
      );
    }
  }
};

export default calculateNotesAndCoordinates;
