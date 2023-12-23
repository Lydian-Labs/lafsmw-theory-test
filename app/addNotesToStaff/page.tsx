"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { Snackbar, Alert } from "@mui/material/";

import GenerateNoteArrayCoordinates from "../components/GenerateNoteArrayCoordinates";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote } = VF;

const AddNotesToAStaff = () => {
  const [noteNotFound, setNoteNotFound] = useState(false);
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

    const newStaves = context
      ? KaseyBlankStaves(4, context, 240, 180, 10, 40, "treble", "4/4")
      : null;

    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;

      let staveIndex: number;
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

      let note = GenerateNoteArrayCoordinates(35, notes).find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          y >= yCoordinateMin && y <= yCoordinateMax
      );
      context?.clear();

      if (!note) {
        setNoteNotFound(true);
      } else {
        const newNote = new StaveNote({
          keys: [note.note],
          duration: "q",
        });
        staveData?.notes.push(newNote);
      }

      const prevNotes = newStaves?.forEach(({ stave, notes }, i) => {
        if (context) {
          stave.setContext(context).draw();
          const validNotes = notes.filter((note) => note instanceof StaveNote);

          if (validNotes.length > 0) {
            Formatter.FormatAndDraw(context, stave, validNotes);
          }
        }
      });
    });
  }, []);
  return (
    <div ref={container} className="text-center mt-[10em]">
      <Snackbar
        open={noteNotFound}
        autoHideDuration={4000}
        onClose={() => setNoteNotFound(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "150%" }}>
          {"The place you clicked doesn't correspond to a note"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddNotesToAStaff;
