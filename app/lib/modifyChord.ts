import { Chord, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental, StaveNote } = VexFlow.Flow;
import { ChordInteractionState } from "./typesAndInterfaces";

export const updatedChord = (chordData: Chord, updatedKeys?: string[]) => {
  return new StaveNote({
    keys: updatedKeys ? updatedKeys : chordData.keys,
    duration: chordData.duration,
  });
};

export const addIndexToChordData = (
  index: number,
  indexArrayName: "sharpIndexArray" | "flatIndexArray",
  chordData: Chord
) => {
  const newIndexArray = [...chordData[indexArrayName], index];
  return { ...chordData, [indexArrayName]: newIndexArray };
};

export const addAllAccidentalsToChord = (
  chordData: Chord,
  newChord: StaveNoteType
) => {
  if (chordData.sharpIndexArray.length > 0) {
    chordData.sharpIndexArray.forEach((sharpIndex) => {
      newChord.addModifier(new Accidental("#"), sharpIndex);
    });
  }

  if (chordData.flatIndexArray.length > 0) {
    chordData.flatIndexArray.forEach((flatIndex) => {
      newChord.addModifier(new Accidental("b"), flatIndex);
    });
  }
};

export const redrawUpdatedChord = (
  chordData: Chord,
  updatedKeys?: string[]
) => {
  const newChord = updatedChord(chordData, updatedKeys || chordData.keys);
  addAllAccidentalsToChord(chordData, newChord);
  return { ...chordData, staveNotes: newChord };
};

export const eraseAccidental = (
  index: number,
  indexArrayName: "sharpIndexArray" | "flatIndexArray",
  chordData: Chord
) => {
  if (chordData[indexArrayName].length > 0) {
    const updatedIndexArray = [...chordData[indexArrayName]];

    const accidentalIndex = updatedIndexArray.findIndex(
      (indexOfNote) => indexOfNote === index
    );
    updatedIndexArray.splice(accidentalIndex, 1);

    return { ...chordData, [indexArrayName]: updatedIndexArray };
  } else return chordData;
};

export const eraseNoteFromChord = (index: number, chordData: Chord) => {
  if (chordData.keys.length > 0) {
    const updatedKeys = [...chordData.keys];
    updatedKeys.splice(index, 1);

    const updatedSharpIndexArray = [...chordData.sharpIndexArray];
    const updatedFlatIndexArray = [...chordData.flatIndexArray];

    if (chordData.sharpIndexArray.length > 0) {
      const accidentalIndex = updatedSharpIndexArray.findIndex(
        (sharpIndex) => sharpIndex === index
      );
      if (accidentalIndex !== -1)
        updatedSharpIndexArray.splice(accidentalIndex, 1);
    }
    if (chordData.flatIndexArray.length > 0) {
      const accidentalIndex = updatedFlatIndexArray.findIndex(
        (flatIndex) => flatIndex === index
      );
      if (accidentalIndex !== -1)
        updatedFlatIndexArray.splice(accidentalIndex, 1);
    }
    return {
      ...chordData,
      keys: updatedKeys,
      sharpIndexArray: updatedSharpIndexArray,
      flatIndexArray: updatedFlatIndexArray,
    };
  } else return chordData;
};
