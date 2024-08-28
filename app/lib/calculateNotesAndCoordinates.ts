import React from "react";
import { NotesAndCoordinatesData, StaveType } from "./typesAndInterfaces";
import generateYMinAndYMaxForKeySig from "./generateYMinAndMaxForKeySig";

const TOLERANCE: number = 2.5;

const minimumTopLineCoordinate = (
  newStaves: StaveType[],
  index: number,
  clefLineNumber: number,
  spacingBetweenLines?: number
): number => {
  if (spacingBetweenLines) {
    spacingBetweenLines = spacingBetweenLines / 2;
    const topLineCoordinate = newStaves[index].getYForLine(clefLineNumber);
    return topLineCoordinate - spacingBetweenLines - TOLERANCE;
  }
  const topLineCoordinate = newStaves[index].getYForLine(clefLineNumber);
  return topLineCoordinate - 2.5;
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
  trebleClefLineNumber: number,
  isLine?: boolean
): void => {
  if (newStaves && newStaves.length > 0) {
    if (!isLine) {
      let minimumYCoordinate: number;
      const spacingBetweenLines = newStaves[index].getSpacingBetweenLines();
      if (clef === "bass") {
        minimumYCoordinate = minimumTopLineCoordinate(
          newStaves,
          index,
          bassClefLineNumber,
          spacingBetweenLines
        );
      } else if (clef === "treble") {
        minimumYCoordinate = minimumTopLineCoordinate(
          newStaves,
          index,
          trebleClefLineNumber,
          spacingBetweenLines
        );
      }
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(minimumYCoordinate, notesArray)
      );
    } else {
      let minimumYCoordinate: number;
      if (clef === "bass") {
        minimumYCoordinate = minimumTopLineCoordinate(
          newStaves,
          index,
          bassClefLineNumber
        );
      } else if (clef === "treble") {
        minimumYCoordinate = minimumTopLineCoordinate(
          newStaves,
          index,
          trebleClefLineNumber
        );
      }
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(minimumYCoordinate, notesArray)
      );
    }
  }
};

export default calculateNotesAndCoordinates;
