"use client";
import { notDeepEqual } from "assert";
import React, { useRef, useEffect, useState } from "react";
import VexFlow, { Accidental, Note } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote, StaveModifier, Barline } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  // const [createNote, setCreateNote] = useState({
  //   note: "e/4",
  //   yCoordinate: 119 || 120 || 121,
  // });

  interface NoteCoordinate {
    note: string;
    yCoordinateMin: number;
    yCoordinateMax: number;
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
    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;
      console.log(y);

      //68 is 'a/5' above the staff
      let yMin: number = 35;

      const generateNoteArrayYCoordinates = (
        yMin: number,
        notes: string[]
      ): NoteCoordinate[] => {
        return notes.map((note, index) => {
          const yCoordinateMin = yMin + index * 5.1;
          const yCoordinateMax = yCoordinateMin + 5;

          return { note, yCoordinateMin, yCoordinateMax };
        });
      };

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
      const noteArrayYCoordinates = generateNoteArrayYCoordinates(yMin, notes);
      console.log(noteArrayYCoordinates);
      let note = noteArrayYCoordinates.find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          //returns the first true statement, or returns undefined if the coordinate isn't found
          y >= yCoordinateMin && y <= yCoordinateMax
      );

      //Create a new StaveNote with the determined note and add it to the staff
      if (!note) {
        throw new Error("Note not found");
      }
      const newNote = new StaveNote({
        keys: [note.note],
        duration: "q",
      });
      // Add the note to the stave and redraw
      context &&
        Formatter.FormatAndDraw(context, stave, [newNote], {
          auto_beam: true,
        });
    });
  }, []);
  return <div ref={container} className="text-center mt-[10em]"></div>;
};

export default AddNotesToAStaff;
