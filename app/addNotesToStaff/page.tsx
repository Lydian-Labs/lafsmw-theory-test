"use client";
import React, { useRef, useEffect } from "react";
import VexFlow, { RenderContext } from "vexflow";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
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

  useEffect(() => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
    //set up renderer and context
    const renderer = rendererRef.current;
    renderer?.resize(800, 800);
    const context = renderer ? renderer.getContext() : null;
    context?.setFont("Arial", 10);
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
    // variables
    let clefWidth = 30;
    let timeWidth = 30;
    let x = 10;
    let y = 40;
    const firstStaveWidth = clefWidth + timeWidth + 170;
    const regularStaveWidth = 180;

    const newStaves = context
      ? KaseyBlankStaves(4, context, clefWidth + timeWidth + 170, 180, x, y)
      : null;

    //logic to draw stave Notes
    const notesToDraw: InstanceType<typeof StaveNote>[] = [];

    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;

      //35 is 'g/6' above the staff. Need to figure out how to not hard code this number.
      let yMin = 35;

      //else if block that determines what stave the user clicked in
      let staveIndex: number = 0;
      if (x < 240) {
        staveIndex = 0;
      } else if (x < 420) {
        staveIndex = 1;
      } else if (x < 600) {
        staveIndex = 2;
      } else {
        staveIndex = 3;
      }
      const staveData = newStaves ? newStaves[staveIndex] : null;

      //function that maps through array of notes and returns an object with the note and the minimum and maximum y coordinates for each note
      const generateNoteArrayCoordinates = (
        yMin: number,
        notes: string[]
      ): NoteCoordinate[] => {
        return notes.map((note, index) => {
          const yCoordinateMin = yMin + index * 5;
          const yCoordinateMax = yCoordinateMin + 5;
          return { note, yCoordinateMin, yCoordinateMax };
        });
      };
      //returns the first true statement, or returns undefined if the coordinate isn't found
      let note = generateNoteArrayCoordinates(yMin, notes).find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          y >= yCoordinateMin && y <= yCoordinateMax
      );
      context?.clear();

      // Redraw the stave
      //Create a new StaveNote with the determined note and add it to the staff
      if (!note) {
        throw new Error("Note not found");
      }
      const newNote = new StaveNote({
        keys: [note.note],
        duration: "q",
      });
      staveData?.notes.push(newNote);
      notesToDraw.push(newNote);
      // Add the note to the stave and redraw
      newStaves?.forEach(({ stave, notes }, i) => {
        if (context) {
          stave.setContext(context).draw();
          Formatter.FormatAndDraw(context, stave, notes);
        }
      });
    });
  }, []);
  return <div ref={container} className="text-center mt-[10em]"></div>;
};

export default AddNotesToAStaff;
