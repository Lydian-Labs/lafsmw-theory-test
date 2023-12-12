"use client";
import { Vex } from "vexflow";
import { useEffect, useRef } from "react";

export default function BlankStaff({
  clef = "treble",
  timeSignature = "4/4",
  noTimeSignature = false,
  width = 1650,
  height = 200,
  addDoubleBarLine = false,
  numBars = 4,
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef();

  // Gather needed width info.
  width = window.innerWidth;
  const fullWidth = width * 0.97;
  const widthOfFirstBar = width / numBars;
  const widthOfRemainingBars =
    (fullWidth - 34 - widthOfFirstBar) / (numBars - 1);

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

      for (let i = 0; i < numBars; i++) {
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
        if (i === numBars - 1 && addDoubleBarLine) {
          stave.setEndBarType(3);
        }
        // Connect the stave to the rendering context and draw.
        stave.setContext(rendererContext).draw();
      }

      // clean up function to remove the svg.
      return () => {
        contRefCurrent.innerHTML = "";
      };
    }
  }, [
    addDoubleBarLine,
    clef,
    widthOfFirstBar,
    height,
    noTimeSignature,
    numBars,
    widthOfRemainingBars,
    timeSignature,
    width,
  ]);

  return <div ref={containerRef} />;
}
