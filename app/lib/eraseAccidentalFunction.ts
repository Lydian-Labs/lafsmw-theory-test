import { indexOfNoteToModify } from "./indexOfNoteToModify";
import { StaveNoteData, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { StaveNote } = VexFlow.Flow;

export const eraseAccidentalFunction = (
  notes: StaveNoteData[],
  x: number
): void => {
  const indexOfNote = indexOfNoteToModify(notes, x);
  const noteToRedraw = notes[indexOfNote].newStaveNote;
  const savedUserClickY = notes[indexOfNote].userClickY;
  const savedUserClickX = notes[indexOfNote].staveNoteAbsoluteX;
  const noteToString = noteToRedraw.getKeys();
  const redrawnStaveNote: StaveNoteType = new StaveNote({
    keys: noteToString,
    duration: "q",
  });
  notes.splice(indexOfNote, 1, {
    newStaveNote: redrawnStaveNote,
    staveNoteAbsoluteX: savedUserClickX,
    userClickY: savedUserClickY,
  });
};
