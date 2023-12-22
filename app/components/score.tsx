"use client";
import React, { useRef, useEffect } from "react";
import VexFlow, { Accidental } from "vexflow";

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

let clefWidth = 30;
let timeWidth = 30;
let maxStavesPerLine = 4;
let lineSpacing = 125;

type Note = string | string[] | [string, number];

interface ScoreProps {
  staves: Note[][];
  clef?: string;
  timeSignature?: string;
  width?: number;
  height?: number;
}

const Score: React.FC<ScoreProps> = ({
  staves = [],
  clef = "treble",
  timeSignature = "4/4",
  width = 1200,
  height = 900,
}) => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let Yposition = 150;
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    renderer ? renderer.resize(width, height) : null;
    const context = renderer ? renderer.getContext() : null;
    context
      ? context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed")
      : null;

    const clefAndTimeWidth =
      (clef ? clefWidth : 0) + (timeSignature ? timeWidth : 0);
    const staveWidth = (width - clefAndTimeWidth) / staves.length;

    let currX = 20;

    staves.forEach((notes, i) => {
      if (i % maxStavesPerLine === 0 && i !== 0) {
        currX = 20;
        Yposition += lineSpacing;
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
      context && stave.setContext(context).draw();

      const processedNotes = notes
        .map((note) => (typeof note === "string" ? { key: note } : note))
        .map((note) =>
          Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        )
        .map(({ key, ...rest }) => {
          if (typeof key === "string") {
            const noteParts = key.match(/([a-gA-G])(#|b|##|bb)?(\d+)/);
            if (noteParts) {
              const [_, noteLetter, accidental, octave] = noteParts;
              const formattedKey = `${noteLetter.toLowerCase()}${
                accidental || ""
              }/${octave}`;
              //this gives us an array of objects...
              return { key: formattedKey, accidental, ...rest };
            }
          }
          return { key: key };
        })
        .map((note: any) => {
          if (typeof note.key === "string" && "accidental" in note) {
            const { key, accidental, duration = "q" } = note;
            const staveNote = new StaveNote({
              keys: [key],
              duration: String(duration),
            });

            if (accidental) {
              staveNote.addModifier(new Accidental(accidental));
            }

            return staveNote;
          }
        });
      processedNotes.filter((note) => note !== undefined);
      context &&
        Formatter.FormatAndDraw(context, stave, processedNotes, {
          auto_beam: true,
        });
    });
  }, [staves, width, height, timeSignature, clef]);

  return <div ref={container} />;
};

export default Score;
