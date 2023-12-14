"use client";
import { notDeepEqual } from "assert";
import React, { useRef, useEffect, useState } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote, StaveModifier, Barline } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [createNote, setCreateNote] = useState({
    note: "e/4",
    yCoordinate: 119 || 120 || 121,
  });

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
    renderer?.resize(500, 500);
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

      const noteArrayYCoordinates: NoteCoordinate[] = [
        { note: "e/4", yCoordinateMin: 117.6, yCoordinateMax: 122.5 },
        { note: "f/4", yCoordinateMin: 114.6, yCoordinateMax: 117.5 },
        { note: "g/4", yCoordinateMin: 107.6, yCoordinateMax: 113.5 },
        { note: "a/4", yCoordinateMin: 102.6, yCoordinateMax: 107.5 },
        { note: "b/4", yCoordinateMin: 97.6, yCoordinateMax: 102.5 },
        { note: "c/5", yCoordinateMin: 92.6, yCoordinateMax: 97.5 },
        { note: "d/5", yCoordinateMin: 87.6, yCoordinateMax: 92.5 },
        { note: "e/5", yCoordinateMin: 83.5, yCoordinateMax: 87.5 },
      ];

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
  return <div ref={container} className="text-center mt-[20em]"></div>;
};

export default AddNotesToAStaff;
