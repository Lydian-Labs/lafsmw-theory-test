"use client";
import React, { useEffect, useRef } from "react";
import VexFlow from "vexflow";

const VF = VexFlow.Flow;
const { Renderer, Stave } = VF;

const MusicStaff: React.FC = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  const initializeRenderer = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  useEffect(() => {
    initializeRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(1100, 600);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);

    // Adjust the coordinates for the scaling
    let x = 10;
    let y = 50;
    let width = 300;

    const stave = new Stave(x, y, width, {
      spacing_between_lines_px: 10, // Increase the space between lines
    });

    stave.addClef("treble").addTimeSignature("4/4");
    context?.scale(1.2, 1.2);
    context ? stave.setContext(context).draw() : null;
  }, []);

  return (
    <>
      <div ref={container} />

      <div className="mt-2 ml-3"></div>
    </>
  );
};

export default MusicStaff;
