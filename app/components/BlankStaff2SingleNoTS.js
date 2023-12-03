"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";

export default function BlankStaff2() {
  const containerRef = useRef(null);
  const rendererRef = useRef();

  useEffect(() => {
    const { Renderer, Stave, StaveConnector } = Vex.Flow;

    const contRefCurrent = containerRef.current;

    if (contRefCurrent) {
      rendererRef.current = new Renderer(contRefCurrent, Renderer.Backends.SVG);

      const renderer = rendererRef.current;

      // Configure the rendering context.
      renderer.resize(1650, 200);
      const rendererContext = renderer.getContext();
      rendererContext.setFont("Arial", 10);

      // Measure 1
      const staveMeasure1 = new Stave(17, 40, 660);
      staveMeasure1.addClef("treble");
      staveMeasure1.setContext(rendererContext).draw();

      // Measure 2
      const staveMeasure2 = new Stave(
        staveMeasure1.width + staveMeasure1.x,
        staveMeasure1.y,
        640
      );
      staveMeasure2.setContext(rendererContext).draw();

      // clean up function to remove the svg. Could possibly also handle this with an if statement?
      return () => {
        contRefCurrent.innerHTML = "";
      };
    }
  }, []);

  return <div ref={containerRef} />;
}
