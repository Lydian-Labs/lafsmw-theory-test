import { indexOfNoteToModify } from "./indexOfNoteToModify";
import {
  StaveNoteData,
  StaveNoteType,
  NoteStringData,
} from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { StaveNote } = VexFlow.Flow;

const changeNoteFunction = (
  notes: StaveNoteData[],
  x: number,
  noteData: NoteStringData,
  y: number
): void => {
  const savedStaveNoteAbsoluteX =
    notes[indexOfNoteToModify(notes, x)].staveNoteAbsoluteX;
  const newStaveNote: StaveNoteType = new StaveNote({
    keys: [noteData.note],
    duration: "q",
  });

  notes.splice(indexOfNoteToModify(notes, x), 1, {
    newStaveNote,
    staveNoteAbsoluteX: savedStaveNoteAbsoluteX,
    userClickY: y,
  });
};

export default changeNoteFunction;
