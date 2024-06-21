import React from "react";
import { NotesAndCoordinatesData, StaveType } from "./typesAndInterfaces";
import generateYMinAndYMaxForKeySig from "./generateYMinAndMaxForKeySig";

const calculateNotesAndCoordinates = (
  clef: string,
  setNotesAndCoordinates: React.Dispatch<
    React.SetStateAction<NotesAndCoordinatesData[]>
  >,
  newStaves: StaveType[],
  notesArray: string[],
  index: number
  //   tolerance: number = 2.5,
  //   lineSpacing: number = 10
): void => {
  if (newStaves && newStaves.length > 0) {
    //const lineSpacing = newStaves[index].getSpacingBetweenLines()
    // console.log("line spacing: ", lineSpacing);
    if (clef === "bass") {
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(
          newStaves[index].getYForLine(1) - 7.5,
          notesArray
        )
      );
    } else if (clef === "treble") {
      setNotesAndCoordinates(() =>
        generateYMinAndYMaxForKeySig(
          newStaves[index].getYForLine(0) - 7.5,
          notesArray
        )
      );
    }
  }
};

export default calculateNotesAndCoordinates;
