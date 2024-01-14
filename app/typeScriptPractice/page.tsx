"use client";
import React from "react";
import VexFlow from "vexflow";
import { useEffect, useRef } from "react";

const VF = VexFlow.Flow;
const { Renderer } = VF;

const TypescriptPractice = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rendererRef.current == null && containerRef.current != null) {
      rendererRef.current = new Renderer(
        containerRef.current,
        Renderer.Backends.SVG
      );
    }
    console.log(rendererRef.current);
  });
  return (
    <div ref={containerRef} className="text-center mt-[20em]">
      Typescript Practice
    </div>
  );
};

export default TypescriptPractice;
