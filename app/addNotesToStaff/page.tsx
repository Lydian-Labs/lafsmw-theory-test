"use client";
import { notDeepEqual } from "assert";
import React, { useRef, useEffect } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    renderer ? renderer.resize(500, 500) : null;
    const context = renderer ? renderer.getContext() : null;
    context ? context.setFont("Arial", 10) : null;
    const stave = new Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    context ? stave.setContext(context).draw() : null;
    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;
      console.log("rect", rect, "x", x);
      const determineNoteFromPosition = (x: number, y: number) => {
        const notePositions = {
          "e/5": 40,
          "d/5": 45,
          "c/5": 50,
          "b/4": 55,
          "a/4": 60,
          "g/4": 65,
          "f/4": 70,
          "e/4": 75,
          "d/4": 80,
        };
        let closestNote = 40;
        let smallestDifference = Math.abs(y - closestNote);
        for (const note in notePositions) {
          const difference = Math.abs(y - closestNote);
          if (difference < smallestDifference) {
            smallestDifference = difference;
            closestNote = note;
          }
        }
        return closestNote;
      };
      const note = determineNoteFromPosition(x, y);
      // Create a new StaveNote with the determined note and add it to the staff
      const newNote = new StaveNote({
        keys: [note],
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
