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
  const widthOfFirstBar = fullWidth / numBars;
  const widthOfRemainingBars =
    (fullWidth - 34 - widthOfFirstBar) / (numBars - 1);
  const lastX = widthOfFirstBar + (numBars - 1) * widthOfRemainingBars + 17;

  // helper function to check for accidentals for each note in the "keys" array of each chord ("keys" refers to the notes in the chord)
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
        // Create the staves, determining the width of the first and other staves and providing a clef and time signature for the first stave as needed
        const stave = new Stave(
          i === 0 ? 17 : widthOfFirstBar + (i - 1) * widthOfRemainingBars + 17,
          40,
          i === 0 ? widthOfFirstBar : widthOfRemainingBars
        );
        if (i === 0) {
          noTimeSignature
            ? stave.addClef(clef)
            : stave.addClef(clef).addTimeSignature(timeSignature);
        }
        // Connect the stave to the rendering context and draw.
        stave.setContext(rendererContext).draw();

        // Create each chord as a StaveNote
        let notesMeasure = [new StaveNote(chords[i])];

        // Determine if any accidentals are needed for the current chord
        let noteGroupAccidentals = noteGroupAccidentalsCheck(chords[i].keys);

        // Add accidentals to notes of each chord as needed
        noteGroupAccidentals.forEach((accidental) => {
          notesMeasure[0].addModifier(
            new Accidental(accidental[0]),
            accidental[1]
          );
        });

        // Format and draw the chord on the current stave
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
    widthOfFirstBar,
    height,
    lastX,
    noTimeSignature,
    numBars,
    widthOfRemainingBars,
    timeSignature,
    width,
  ]);

  return <div ref={containerRef} />;
}
