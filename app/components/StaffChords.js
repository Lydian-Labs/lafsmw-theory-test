"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";

export default function StaffChords({
  clef = "treble",
  timeSignature = "4/4",
  noTimeSignature = false,
  width = 1650,
  height = 200,
  addDoubleBarLine = false,
  numBars = 4,
  chords = [],
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef();

  // Gather needed width info
  width = window.innerWidth;
  const fullWidth = width * 0.97;
  const firstWidth = fullWidth / numBars;
  const otherWidth = (fullWidth - 34 - firstWidth) / (numBars - 1);
  const lastX = firstWidth + (numBars - 1) * otherWidth + 17;

  // import notes, but dummy data for now
  //let chords = seventhChords;

  function noteGroupAccidentalsCheck(keys) {
    let noteAccidentals = [];
    for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      if (currentKey.includes("bb")) {
        noteAccidentals.push(["b", i]);
      }
      if (currentKey.includes("b") && currentKey[0] !== "b") {
        noteAccidentals.push(["b", i]);
      }
      if (currentKey.includes("#")) {
        noteAccidentals.push(["#", i]);
      }
    }
    return noteAccidentals;
  }

  useEffect(() => {
    const {
      Renderer,
      Stave,
      StaveNote,
      Accidental,
      Formatter,
      StaveConnector,
    } = Vex.Flow;

    const contRefCurrent = containerRef.current;

    if (contRefCurrent) {
      rendererRef.current = new Renderer(contRefCurrent, Renderer.Backends.SVG);

      const renderer = rendererRef.current;

      // Configure the rendering context.
      renderer.resize(width, height);
      const rendererContext = renderer.getContext();
      rendererContext.setFont("Arial", 10);

      for (let i = 0; i < numBars; i++) {
        const stave = new Stave(
          i === 0 ? 17 : firstWidth + (i - 1) * otherWidth + 17,
          40,
          i === 0 ? firstWidth : otherWidth
        );
        if (i === 0) {
          noTimeSignature
            ? stave.addClef(clef)
            : stave.addClef(clef).addTimeSignature(timeSignature);
        }
        // Connect the stave to the rendering context and draw.
        stave.setContext(rendererContext).draw();

        // Create the notes
        let notesMeasure = [new StaveNote(chords[i])];

        // Add accidentals to notes
        let noteGroupAccidentals = noteGroupAccidentalsCheck(chords[i].keys);

        noteGroupAccidentals.forEach((accidental) => {
          notesMeasure[0].addModifier(
            new Accidental(accidental[0]),
            accidental[1]
          );
        });

        // Helper function to justify and draw a 4/4 voice.
        Formatter.FormatAndDraw(rendererContext, stave, notesMeasure);
      }

      // Helper function to add double bar lines
      function addDoubleBar(stave1, stave2) {
        const connector = new StaveConnector(stave1, stave2);
        connector.setType(StaveConnector.type.boldDoubleRight);
        connector.setContext(rendererContext);
        connector.draw();
      }

      if (addDoubleBarLine) {
        const endBar = new Stave(lastX, 40, 1);
        endBar.setContext(rendererContext).draw();
        addDoubleBar(endBar, endBar);
      }

      // clean up function to remove the svg. Could possibly also handle this with an if statement?
      return () => {
        contRefCurrent.innerHTML = "";
      };
    }
  }, [
    addDoubleBarLine,
    chords,
    clef,
    firstWidth,
    height,
    lastX,
    noTimeSignature,
    numBars,
    otherWidth,
    timeSignature,
    width,
  ]);

  return <div ref={containerRef} />;
}
