"use client";
import { notDeepEqual } from "assert";
import React, { useRef, useEffect } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote, StaveModifier, Barline } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  interface NoteCoordinate {
    note: string;
    yCoordinate: number;
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
      // console.log("y", y);
      // console.log("x", x);

      const noteArrayYCoordinates: NoteCoordinate[] = [
        { note: "e/4", yCoordinate: 120 },
        { note: "f/4", yCoordinate: 115 },
        { note: "g/4", yCoordinate: 110 },
        { note: "a/4", yCoordinate: 105 },
        { note: "b/4", yCoordinate: 100 },
        { note: "c/5", yCoordinate: 95 },
        { note: "d/5", yCoordinate: 90 },
        { note: "e/5", yCoordinate: 85 },
      ];

      let note = noteArrayYCoordinates.find(
        ({ yCoordinate }) => yCoordinate === y
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
