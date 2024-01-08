"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;
import generateNoteCoordinates from "../components/generateNoteCoordinates";
import noteArray from "@/lib/noteArray";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
type StaveType = InstanceType<typeof Stave>;
type StaveNoteType = InstanceType<typeof StaveNote>;
import { Snackbar, Alert } from "@mui/material/";
import { renderBlueButton } from "../components/RenderButtons";
import { DrawStave } from "../components/DrawSingleStave";
import renderNotes from "../renderNotes/page";

const EraseNotesFromOneStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notes, setNotes] = useState<StaveNoteType[]>([]);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isEnterNotesActive, setIsEnterNotesActive] = useState(false);
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);

  const clef = "treble";
  const timeSig = "4/4";
  const beatsInMeasure = parseInt(timeSig.split("/")[0]);

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
    setIsEnterNotesActive(false);
  };

  const enterNotes = () => {
    setIsEnterNotesActive(!isEnterNotesActive);
    setIsEraserActive(false);
  };

  const createRenderer = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  const RenderNotes = () => {
    const renderer = rendererRef.current;
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    context && setStaves([DrawStave(context, 10, 200, 400, clef, timeSig)]);

    if (notes.length > 0) {
      context && Formatter.FormatAndDraw(context, staves[0], notes);
    }
  };

  const clearMeasure = () => {
    setNotes(() => {
      const newArray: [] = [];
      return newArray;
    });
    createRenderer();
    RenderNotes();
  };

  const notesArray = noteArray();

  useEffect(() => {
    createRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context && setStaves([DrawStave(context, 10, 200, 400, clef, timeSig)]);
  }, []);

  useEffect(() => {
    RenderNotes();
  }, [notes]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    const x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;

    let findNoteObject = generateNoteCoordinates(200, notesArray).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        y >= yCoordinateMin && y <= yCoordinateMax
    );

    if (!findNoteObject) {
      setNoteNotFound(true);
    } else if (isEraserActive) {
      setNotes((prevState) => {
        if (prevState.length > 0) {
          const newArray = [...prevState];
          newArray.pop();
          console.log(newArray);
          return newArray;
        }
        return prevState;
      });
    } else if (notes.length >= beatsInMeasure) {
      setTooManyBeatsInMeasure(true);
    } else {
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
      <CheckNumBeatsInMeasure
        tooManyBeatsInMeasure={tooManyBeatsInMeasure}
        setTooManyBeatsInMeasure={setTooManyBeatsInMeasure}
      />
      <Snackbar
        open={noteNotFound}
        autoHideDuration={4000}
        onClose={() => setNoteNotFound(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert variant="filled" severity="error">
          {"The location you clicked doesn't correspond to a note"}
        </Alert>
      </Snackbar>
      <div className="mt-5">
        {renderBlueButton(eraser, "Eraser", isEraserActive)}
        {renderBlueButton(enterNotes, "Enter Notes", isEnterNotesActive)}
        {renderBlueButton(clearMeasure, "Clear Measure")}
      </div>
    </>
  );
};

export default EraseNotesFromOneStave;
