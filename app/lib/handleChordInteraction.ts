import VexFlow from "vexflow";

import {
  ChordInteractionState,
  ChordInteractionAction,
  NoteStringData,
  Chord,
} from "./typesAndInterfaces";
const { StaveNote, Accidental } = VexFlow.Flow;

export const handleChordInteraction = (
  updatedFoundNoteData: NoteStringData,
  noteNotFound: React.Dispatch<ChordInteractionAction>,
  noNoteFoundAction: string,
  chordData: Chord,
  state: ChordInteractionState,
  userClickY: number,
  indexOfAccidental: number
) => {
  if (!updatedFoundNoteData) {
    noteNotFound({ type: noNoteFoundAction });
  } else if (state.isSharpActive || state.isFlatActive) {
    if (indexOfAccidental !== -1) {
      if (state.isSharpActive) {
        const newIndexArray = [...chordData.sharpIndexArray, indexOfAccidental];
        chordData = {
          ...chordData,
          sharpIndexArray: newIndexArray,
        };
      } else if (state.isFlatActive) {
        const newIndexArray = [...chordData.flatIndexArray, indexOfAccidental];
        chordData = {
          ...chordData,
          flatIndexArray: newIndexArray,
        };
      }
      const newChord = new StaveNote({
        keys: chordData.keys,
        duration: chordData.duration,
      });

      // Add all the sharps
      chordData.sharpIndexArray.forEach((sharpIndex) => {
        newChord.addModifier(new Accidental("#"), sharpIndex);
      });

      // Add all the flats
      chordData.flatIndexArray.forEach((flatIndex) => {
        newChord.addModifier(new Accidental("b"), flatIndex);
      });

      chordData = {
        ...chordData,
        staveNotes: newChord,
      };
    }
  } else if (state.isEraseSharpActive || state.isEraseFlatActive) {
    if (state.isEraseSharpActive) {
      const updatedSharpIndexArray = [...chordData.sharpIndexArray];
      updatedSharpIndexArray.splice(indexOfAccidental, 1);
      chordData = {
        ...chordData,
        sharpIndexArray: updatedSharpIndexArray,
      };
    } else if (state.isEraseFlatActive) {
      const updatedFlatIndexArray = [...chordData.flatIndexArray];
      updatedFlatIndexArray.splice(indexOfAccidental, 1);
      chordData = {
        ...chordData,
        flatIndexArray: updatedFlatIndexArray,
      };
    }

    const newChord = new StaveNote({
      keys: chordData.keys,
      duration: chordData.duration,
    });

    chordData.flatIndexArray.forEach((flatIndex) => {
      newChord.addModifier(new Accidental("b"), flatIndex);
    });
    chordData.sharpIndexArray.forEach((sharpIndex) => {
      newChord.addModifier(new Accidental("#"), sharpIndex);
    });
    chordData = {
      ...chordData,
      staveNotes: newChord,
    };
  } else if (state.isEraseNoteActive) {
    if (chordData.staveNotes) {
      if (indexOfAccidental !== -1) {
        const updatedKeys = [...chordData.keys];
        updatedKeys.splice(indexOfAccidental, 1);
        const newChord = new StaveNote({
          keys: updatedKeys,
          duration: chordData.duration,
        });
        chordData.flatIndexArray.forEach((flatIndex) => {
          newChord.addModifier(new Accidental("b"), flatIndex);
        });
        chordData.sharpIndexArray.forEach((sharpIndex) => {
          newChord.addModifier(new Accidental("#"), sharpIndex);
        });
        chordData = {
          ...chordData,
          keys: updatedKeys,
          staveNotes: newChord,
        };
      }
    }
  } else {
    if (chordData.keys.length >= 4) return;

    const updatedKeys = [...chordData.keys, updatedFoundNoteData.note];

    const newChord = new StaveNote({
      keys: updatedKeys,
      duration: chordData.duration,
    });

    chordData.flatIndexArray.forEach((flatIndex) => {
      newChord.addModifier(new Accidental("b"), flatIndex);
    });
    chordData.sharpIndexArray.forEach((sharpIndex) => {
      newChord.addModifier(new Accidental("#"), sharpIndex);
    });

    chordData = {
      ...chordData,
      keys: updatedKeys,
      staveNotes: newChord,
      userClickY: userClickY,
    };
  }
};
