"use client";
import React, { useRef, useEffect } from "react";
import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  interface NoteCoordinate {
    note: string;
    yCoordinateMin: number;
    yCoordinateMax: number;
  }

  interface staveNote {
    keys: string;
    duration: string;
  }

  useEffect(() => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    renderer?.resize(500, 700);
    const context = renderer ? renderer.getContext() : null;
    context?.setFont("Arial", 10);
    const stave = new Stave(10, 40, 400);
    stave.setEndBarType(3);
    stave.addClef("treble").addTimeSignature("4/4");
    context ? stave.setContext(context).draw() : null;
    const notesToDraw: InstanceType<typeof StaveNote>[] = [];
    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;
      console.log("y:", y);
      console.log("x:", x);

      //35 is 'g/6' above the staff. Need to figure out how to not hard code this number.
      let yMin = 35;

      //array of notes
      const notes = [
        "g/6",
        "f/6",
        "e/6",
        "d/6",
        "c/6",
        "b/5",
        "a/5",
        "g/5",
        "f/5",
        "e/5",
        "d/5",
        "c/5",
        "b/4",
        "a/4",
        "g/4",
        "f/4",
        "e/4",
        "d/4",
        "c/4",
        "b/3",
        "a/3",
        "g/3",
      ];
      //function that maps through array of notes and returns an object with the note and the minimum and maximum y coordinates for each note
      const generateNoteArrayCoordinates = (
        yMin: number,
        notes: string[]
      ): NoteCoordinate[] => {
        return notes.map((note, index) => {
          const yCoordinateMin = yMin + index * 5.1;
          const yCoordinateMax = yCoordinateMin + 4.9;
          return { note, yCoordinateMin, yCoordinateMax };
        });
      };

      const noteArrayYCoordinates = generateNoteArrayCoordinates(yMin, notes);
      let note = noteArrayYCoordinates.find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          //returns the first true statement, or returns undefined if the coordinate isn't found
          y >= yCoordinateMin && y <= yCoordinateMax
      );
      context?.clear();

      // Redraw the stave
      context ? stave.setContext(context).draw() : null;
      //Create a new StaveNote with the determined note and add it to the staff
      if (!note) {
        throw new Error("Note not found");
      }
      const newNote = new StaveNote({
        keys: [note.note],
        duration: "q",
      });
      notesToDraw.push(newNote);
      // Add the note to the stave and redraw
      context &&
        Formatter.FormatAndDraw(context, stave, notesToDraw, {
          auto_beam: true,
        });
    });
  }, []);
  return <div ref={container} className="text-center mt-[10em]"></div>;
};

export default AddNotesToAStaff;
