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

  const drawStave = (context, x: number, y: number, width: number) => {
    const newStave = new Stave(x, y, width);
    newStave.addClef("treble");
    newStave.addTimeSignature("4/4");
    context && newStave.setContext(context).draw();
    setStaves([newStave]);
  };

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
  };

  const notesArray = noteArray();

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
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    drawStave(context, 10, 200, 400);
  }, []);

  useEffect(() => {
    if (staves && notes.length > 0) {
      RenderNotes();
    }
  }, [notes]);

  const RenderNotes = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    drawStave(context, 10, 200, 400);
    context && Formatter.FormatAndDraw(context, staves[0], notes);
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;

    let findNoteObject = generateNoteCoordinates(180, notesArray).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        y >= yCoordinateMin && y <= yCoordinateMax
    );

    if (findNoteObject) {
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: findNoteObject && [findNoteObject.note],
        duration: "q",
      });

      setNotes((prevState) => [...prevState, newStaveNote]);
    }
  };

  return (
    <>
      <div ref={container} onClick={handleClick} />
      <div className="mt-5">{renderEraseNotesButton()}</div>
    </>
  );
};

export default EraseNotesFromOneStave;
