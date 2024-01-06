"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;
import BlueButton from "../components/BlueButton";
import generateNoteCoordinates from "../components/generateNoteCoordinates";
import noteArray from "@/lib/noteArray";
type StaveType = InstanceType<typeof Stave>;
type StaveNoteType = InstanceType<typeof StaveNote>;

const EraseNotesFromOneStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notes, setNotes] = useState<StaveNoteType[]>([]);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const contextRef = useRef(null);

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
  };

  const renderEraseNotesButton = () => (
    <BlueButton onClick={eraser} isEnabled={isEraserActive}>
      {"Eraser"}
    </BlueButton>
  );

  useEffect(() => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
    const renderer = rendererRef.current;

    renderer?.resize(800, 300);
    const containerRef = container.current;
    const context = renderer ? renderer.getContext() : null;
    context?.setFont("Arial", 10);
    const newStave = new Stave(10, 200, 400);
    newStave.addClef("treble");
    newStave.addTimeSignature("4/4");
    context && newStave.setContext(context).draw();

    const handleClick = (e: MouseEvent) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;

      let findNoteObject = generateNoteCoordinates(35, noteArray()).find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          y >= yCoordinateMin && y <= yCoordinateMax
      );

      setStaves((prevState: StaveType[]) => {
        return [...prevState, newStave];
      });
      setNotes((prevState: StaveNoteType[]) => {
        return [...prevState, ...notes];
      });
      if (staves.length > 0 && contextRef.current) {
        setNotes((prevState) => {
          const newStavesNotes = [...prevState];
          newStavesNotes.pop();
          return newStavesNotes;
        });
      }
    };

    container.current?.addEventListener("click", handleClick);

    //FormatAndDraw expects a singe stave object
  }, [staves, isEraserActive, notes]);

  return (
    <>
      <div ref={container} />
      <div className="mt-5">{renderEraseNotesButton()}</div>
    </>
  );
};
export default EraseNotesFromOneStave;
