"use client";
import { notDeepEqual } from "assert";
import React, { useRef, useEffect } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote, StaveModifier, Barline } = VF;

const AddNotesToAStaff = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  type Note = string;

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
      console.log("y", y);
      console.log("x", x);

      let note: Note = "c/4";
      const lowEyPosition = 120;

      if (y === lowEyPosition) {
        note = "e/4";
      } else if (y === lowEyPosition - 5) {
        note = "f/4";
      } else if (y === lowEyPosition - 10) {
        note = "g/4";
      } else if (y === lowEyPosition - 15) {
        note = "a/4";
      } else if (y === lowEyPosition - 20) {
        note = "b/4";
      } else if (y === lowEyPosition - 25) {
        note = "c/5";
      } else if (y === lowEyPosition - 30) {
        note = "d/5";
      } else if (y === lowEyPosition - 35) {
        note = "e/5";
      }
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
