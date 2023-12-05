"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";

export default function SeventhChords({
  clef = "treble",
  timeSignature = "4/4",
  width = 1650,
  height = 200,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef();

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

      // Measure 1
      const staveMeasure1 = new Stave(17, 40, 250);
      staveMeasure1.addClef(clef).addTimeSignature(timeSignature);
      staveMeasure1.setContext(rendererContext).draw();

      // Create the notes
      const notesMeasure1 = [
        new StaveNote({
          keys: ["e#/4", "g#/4", "b/4", "d/5"],
          duration: "w",
        })
          .addModifier(new Accidental("#"), 0)
          .addModifier(new Accidental("#"), 1),
      ];

      // Helper function to justify and draw a 4/4 voice.
      Formatter.FormatAndDraw(rendererContext, staveMeasure1, notesMeasure1);

      // Measure 2 - second measure is placed adjacent to first measure.
      // I believe it is possible to use the width of the first measure to determine the x position of the second measure. So, for each measure, the x position is the sum of the width of all previous measures.
      const staveMeasure2 = new Stave(
        staveMeasure1.width + staveMeasure1.x,
        staveMeasure1.y,
        175
      );

      const notesMeasure2 = [
        new StaveNote({
          keys: ["f/4", "a/4", "c/5", "e/5"],
          duration: "w",
        }),
      ];

      staveMeasure2.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure2, notesMeasure2);

      // Measure 3
      const staveMeasure3 = new Stave(
        staveMeasure2.width + staveMeasure2.x,
        staveMeasure2.y,
        175
      );

      const notesMeasure3 = [
        new StaveNote({
          keys: ["g/4", "bb/4", "d/5", "f#/5"],
          duration: "w",
        })
          .addModifier(new Accidental("b"), 1)
          .addModifier(new Accidental("#"), 3),
      ];

      staveMeasure3.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure3, notesMeasure3);

      // Measure 4
      const staveMeasure4 = new Stave(
        staveMeasure3.width + staveMeasure3.x,
        staveMeasure3.y,
        175
      );

      const notesMeasure4 = [
        new StaveNote({
          keys: ["b/4", "d#/5", "f#/5", "a/5"],
          duration: "w",
        })
          .addModifier(new Accidental("#"), 1)
          .addModifier(new Accidental("#"), 2),
      ];

      staveMeasure4.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure4, notesMeasure4);

      // Measure 5
      const staveMeasure5 = new Stave(
        staveMeasure4.width + staveMeasure4.x,
        staveMeasure4.y,
        175
      );

      const notesMeasure5 = [
        new StaveNote({
          keys: ["f#/4", "a/4", "c/5", "e/5"],
          duration: "w",
        }).addModifier(new Accidental("#"), 0),
      ];

      staveMeasure5.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure5, notesMeasure5);

      // Measure 6
      const staveMeasure6 = new Stave(
        staveMeasure5.width + staveMeasure5.x,
        staveMeasure5.y,
        175
      );

      const notesMeasure6 = [
        new StaveNote({
          keys: ["ab/4", "cb/5", "eb/5", "gb/5"],
          duration: "w",
        })
          .addModifier(new Accidental("b"), 0)
          .addModifier(new Accidental("b"), 1)
          .addModifier(new Accidental("b"), 2)
          .addModifier(new Accidental("b"), 3),
      ];

      staveMeasure6.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure6, notesMeasure6);

      // Measure 7
      const staveMeasure7 = new Stave(
        staveMeasure6.width + staveMeasure6.x,
        staveMeasure6.y,
        175
      );

      const notesMeasure7 = [
        new StaveNote({
          keys: ["d/4", "f#/4", "a#/4", "c/5"],
          duration: "w",
        })
          .addModifier(new Accidental("#"), 1)
          .addModifier(new Accidental("#"), 2),
      ];

      staveMeasure7.setContext(rendererContext).draw();

      Formatter.FormatAndDraw(rendererContext, staveMeasure7, notesMeasure7);

      // Measure 8
      const staveMeasure8 = new Stave(
        staveMeasure7.width + staveMeasure7.x,
        staveMeasure7.y,
        1
      );
      staveMeasure8.setContext(rendererContext).draw();

      // Add double barline to the end of the score using StaveConnector
      const connector = new StaveConnector(staveMeasure8, staveMeasure8);
      connector.setType(StaveConnector.type.boldDoubleRight);
      connector.setContext(rendererContext);
      connector.draw();

      // clean up function to remove the svg. Could possibly also handle this with an if statement?
      return () => {
        contRefCurrent.innerHTML = "";
      };
    }
  }, []);

  return <div ref={containerRef} />;
}
