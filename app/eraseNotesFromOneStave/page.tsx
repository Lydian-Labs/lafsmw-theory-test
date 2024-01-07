"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow, { IRenderContext } from "vexflow";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;
import { Snackbar, Alert } from "@mui/material/";
import BlueButton from "../components/BlueButton";
import generateNoteCoordinates from "../components/generateNoteCoordinates";
import noteArray from "@/lib/noteArray";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
type StaveType = InstanceType<typeof Stave>;
type StaveNoteType = InstanceType<typeof StaveNote>;

const EraseNotesFromOneStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notes, setNotes] = useState<StaveNoteType[]>([]);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isEnterNotesActive, setIsEnterNotesActive] = useState(true);
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);

  const timeSig = "4/4";
  const beatsInMeasure = parseInt(timeSig.split("/")[0]);

  const drawStave = (
    context: IRenderContext,
    x: number,
    y: number,
    width: number
  ) => {
    const newStave = new Stave(x, y, width);
    newStave.addClef("treble");
    newStave.addTimeSignature(timeSig);
    context && newStave.setContext(context).draw();
    setStaves([newStave]);
  };

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
    setIsEnterNotesActive(false);
  };

  const enterNotes = () => {
    setIsEnterNotesActive(isEnterNotesActive);
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
    context && drawStave(context, 10, 200, 400);
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

  const renderEraseNotesButton = () => (
    <BlueButton onClick={eraser} isEnabled={isEraserActive}>
      {"Eraser"}
    </BlueButton>
  );
  const renderEnterNotesButton = () => (
    <BlueButton onClick={enterNotes} isEnabled={isEnterNotesActive}>
      {"EnterNotes"}
    </BlueButton>
  );
  const renderClearMeasureButton = () => (
    <BlueButton onClick={clearMeasure}>{"Clear Measure"}</BlueButton>
  );

  useEffect(() => {
    createRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context && drawStave(context, 10, 200, 400);
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
        {renderEraseNotesButton()}
        {renderEnterNotesButton()}
        {renderClearMeasureButton()}
      </div>
    </>
  );
};

export default EraseNotesFromOneStave;
