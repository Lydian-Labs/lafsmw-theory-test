import { Chord, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState } from "./typesAndInterfaces";

export const addAllAccidentalsToChord = (
  chordData: Chord,
  newChord: StaveNoteType
) => {
  chordData.sharpIndexArray.forEach((sharpIndex) => {
    newChord.addModifier(new Accidental("#"), sharpIndex);
  });

  chordData.flatIndexArray.forEach((flatIndex) => {
    newChord.addModifier(new Accidental("b"), flatIndex);
  });

  chordData = { ...chordData };
};

export const addIndexToChordData = (
  index: number,
  indexArrayName: "sharpIndexArray" | "flatIndexArray",
  chordData: Chord
) => {
  if (index !== -1) {
    const newIndexArray = [...chordData[indexArrayName], index];
    return { ...chordData, [indexArrayName]: newIndexArray };
  } else return chordData;
};

export const updatedChord = (chordData: Chord) => {
  return new StaveNote({ keys: chordData.keys, duration: chordData.duration });
};

export const eraseAccidental = (
  index: number,
  indexArrayName: "sharpIndexArray" | "flatIndexArray",
  chordData: Chord
) => {
  if (index !== -1) {
    const newIndexArray = [...chordData[indexArrayName]].splice(index, 1);
    return { ...chordData, [indexArrayName]: newIndexArray };
  } else return chordData;
};
