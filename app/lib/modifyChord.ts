import { Chord, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { Accidental } = VexFlow.Flow;

export const addAccidentalsToChord = (
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
