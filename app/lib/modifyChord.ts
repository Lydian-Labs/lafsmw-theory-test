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
    if (accidentalIndex !== -1) updatedIndexArray.splice(accidentalIndex, 1);

    return { ...chordData, [indexArrayName]: updatedIndexArray };
  } else return chordData;
};

export const eraseNoteFromChord2 = (index: number, chordData: Chord) => {
  const { keys, sharpIndexArray, flatIndexArray } = chordData;

  if (index !== -1) {
    // Remove the note from the keys
    const updatedKeys = [...keys];
    updatedKeys.splice(index, 1);

    // Adjust the sharp and flat index arrays
    // This map operation adjusts indices that come after the removed index
    const adjustIndex = (idx: number) => (idx > index ? idx - 1 : idx);

    // This filter operation ensures that the removed index is no longer part of the arrays
    const filterIndex = (idx: number) => idx !== index;

    const updatedSharpIndexArray = sharpIndexArray
      .map(adjustIndex)
      .filter(filterIndex);

    const updatedFlatIndexArray = flatIndexArray
      .map(adjustIndex)
      .filter(filterIndex);

    return {
      ...chordData,
      keys: updatedKeys,
      sharpIndexArray: updatedSharpIndexArray,
      flatIndexArray: updatedFlatIndexArray,
    };
  }
  return chordData;
};
