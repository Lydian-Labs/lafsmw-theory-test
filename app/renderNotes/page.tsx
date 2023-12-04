"use client";

import React, { useRef, useEffect } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

let clefWidth: number = 30;
let timeWidth: number = 30;
let maxStavesPerLine: number = 4;
let lineSpacing: number = 125;

const Score = ({
  staves = [],
  clef = "treble",
  timeSignature = "4/4",
  width = 1200,
  height = 900,
}) => {
  const container: any = useRef();
  const rendererRef: any = useRef();

  useEffect(() => {
    let Yposition: number = 150;

    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    const clefAndTimeWidth: number =
      (clef ? clefWidth : 0) + (timeSignature ? timeWidth : 0);
    const staveWidth = (width - clefAndTimeWidth) / staves.length;

    let currX: number = 20;

    staves.forEach((notes: [] | number, i: number) => {
      if (i % maxStavesPerLine === 0 && i !== 0) {
        currX = 20; // Reset X to starting position
        Yposition += lineSpacing; // Move Y down for the new line
      }
      const stave = new Stave(currX, Yposition, staveWidth);
      if (i === 0) {
        stave.setWidth(staveWidth + clefAndTimeWidth);
        clef && stave.addClef(clef);
        timeSignature && stave.addTimeSignature(timeSignature);
      }
      if (staves && i === staves.length - 1) {
        stave.setEndBarType(2);
      }
      currX += stave.getWidth();
      stave.setContext(context).draw();

      const processedNotes = notes
        //this gives us an array [{key: "g3"},{key: "c4"}] etc...
        .map((note) => ({ key: note }))
        .map((note) =>
          Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        )
        .map(({ key, ...rest }) => {
          if (typeof key === "string") {
            const noteParts = key.match(/([a-gA-G])(#|b|##|bb)?(\d+)/);
            if (noteParts) {
              const [_, noteLetter, accidental, octave] = noteParts;
              const formattedKey = `${noteLetter.toLowerCase()}${
                accidental ? accidental : ""
              }/${octave}`;
              return { key: formattedKey, accidental, ...rest };
            }
          }
        })
        .map(({ key, keys, accidental, duration = "q" }) => {
          const staveNote = new StaveNote({
            keys: key ? [key] : [keys],
            duration: String(duration),
          });

          if (accidental) {
            staveNote.addModifier(new Accidental(accidental));
          }

          return staveNote;
        });

      Formatter.FormatAndDraw(context, stave, processedNotes, {
        auto_beam: true,
      });
    });
  }, [staves, width, height, timeSignature, clef]);

  return <div ref={container} />;
};

export default Score;
