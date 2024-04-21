import { Chord, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState } from "./typesAndInterfaces";

export const addAllAccidentalsToChord = (
  chordData: Chord,
  newChord: StaveNoteType
) => {
  // Add all the sharps
  chordData.sharpIndexArray.forEach((sharpIndex) => {
    newChord.addModifier(new Accidental("#"), sharpIndex);
  });

  // Add all the flats
  chordData.flatIndexArray.forEach((flatIndex) => {
    newChord.addModifier(new Accidental("b"), flatIndex);
  });
};

export const addIndexToChordData = (
  index: number,
  indexArrayName: "sharpIndexArray" | "flatIndexArray",
  chordData: Chord
) => {
  const newIndexArray = [...chordData[indexArrayName], index];
  chordData = { ...chordData, [indexArrayName]: newIndexArray };

  return chordData;
};
