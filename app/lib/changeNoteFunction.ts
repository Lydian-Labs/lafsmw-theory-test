import { indexOfNoteToModify } from "./indexOfNoteToModify";
import { StaveNoteData, StaveNoteType } from "./typesAndInterfaces";
import VexFlow from "vexflow";
const { StaveNote } = VexFlow.Flow;

const changeNoteFunction = (notes: StaveNoteData[], x:number, noteData, y:number ): void => {
    const indexOfNote = indexOfNoteToModify(notes, x);
    const savedUserClickX = notes[indexOfNote].staveNoteAbsoluteX;
    const newStaveNote: StaveNoteType = new StaveNote({
      keys: [noteData.note],
      duration: "q",
    });

    notes.splice(indexOfNote, 1, {
      newStaveNote,
      staveNoteAbsoluteX: savedUserClickX,
      y,
    });
}

export default changeNoteFunction