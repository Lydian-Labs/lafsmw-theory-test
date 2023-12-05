"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";

export default function BlankStaff4({
  clef = "treble",
  timeSignature = "4/4",
  noTimeSignature = false,
  width = 1650,
  height = 200,
  addDoubleBarLine = false,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef();

  useEffect(() => {
    const { Renderer, Stave, StaveConnector } = Vex.Flow;

    const contRefCurrent = containerRef.current;

    if (contRefCurrent) {
      rendererRef.current = new Renderer(contRefCurrent, Renderer.Backends.SVG);

      const renderer = rendererRef.current;

      // Configure the rendering context.
      renderer.resize(width, height);
      const rendererContext = renderer.getContext();
      rendererContext.setFont("Arial", 10);

      // Measure 1
      const staveMeasure1 = new Stave(17, 40, 340);
      noTimeSignature
        ? staveMeasure1.addClef(clef)
        : staveMeasure1.addClef(clef).addTimeSignature(timeSignature);
      staveMeasure1.setContext(rendererContext).draw();

      // Measure 2
      const staveMeasure2 = new Stave(
        staveMeasure1.width + staveMeasure1.x,
        staveMeasure1.y,
        320
      );
      staveMeasure2.setContext(rendererContext).draw();

      // Measure 3
      const staveMeasure3 = new Stave(
        staveMeasure2.width + staveMeasure2.x,
        staveMeasure2.y,
        320
      );
      staveMeasure3.setContext(rendererContext).draw();

      // Measure 4
      const staveMeasure4 = new Stave(
        staveMeasure3.width + staveMeasure3.x,
        staveMeasure3.y,
        320
      );
      staveMeasure4.setContext(rendererContext).draw();

      // Helper function to add double bar lines
      function addDoubleBar(stave1, stave2) {
        const connector = new StaveConnector(stave1, stave2);
        connector.setType(StaveConnector.type.boldDoubleRight);
        connector.setContext(rendererContext);
        connector.draw();
      }

      if (addDoubleBarLine) {
        // Create Measure 5
        const staveMeasure5 = new Stave(
          staveMeasure4.width + staveMeasure4.x,
          staveMeasure4.y,
          1
        );
        staveMeasure5.setContext(rendererContext).draw();
        addDoubleBar(staveMeasure5, staveMeasure5);
      }

      // clean up function to remove the svg. Could possibly also handle this with an if statement?
      return () => {
        contRefCurrent.innerHTML = "";
      };
    }
  }, []);

  return <div ref={containerRef} />;
}
