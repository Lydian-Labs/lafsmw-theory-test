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
  chordData.sharpIndexArray.forEach((sharpIndex) => {
    newChord.addModifier(new Accidental("#"), sharpIndex);
  });

  chordData.flatIndexArray.forEach((flatIndex) => {
    newChord.addModifier(new Accidental("b"), flatIndex);
  });
  return newChord;
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
  if (index === -1) return;
  if (chordData[indexArrayName].length > 0) {
    const updatedIndexArray = [...chordData[indexArrayName]];
    updatedIndexArray.splice(index, 1);

    return { ...chordData, [indexArrayName]: updatedIndexArray };
  } else return chordData;
};

export const eraseNoteFromChord = (index: number, chordData: Chord) => {
  if (chordData.staveNotes) {
    if (index !== -1) {
      const updatedKeys = [...chordData.keys];
      updatedKeys.splice(index, 1);

      const newChord = updatedChord(chordData, updatedKeys);

      addAllAccidentalsToChord(chordData, newChord);

      return {
        ...chordData,
        keys: updatedKeys,
        staveNotes: newChord,
      };
    } else return chordData;
  } else return chordData;
};
