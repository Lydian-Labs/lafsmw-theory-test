"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;
import generateNoteCoordinates from "../components/generateNoteCoordinates";
import noteArray from "@/lib/noteArray";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import findBar from "../components/findBar";
type StaveType = InstanceType<typeof Stave>;
type StaveNoteType = InstanceType<typeof StaveNote>;
import { Snackbar, Alert } from "@mui/material/";
import { renderBlueButton } from "../components/RenderButtons";

const clef = "treble";
const timeSig = "4/4";
const beatsInMeasure = parseInt(timeSig.split("/")[0]);
let numStaves = 4;
const notesArray = noteArray();

const EraseNotesFromOneStave = () => {
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const [staves, setStaves] = useState<StaveType[]>([]);
  const [notes, setNotes] = useState<StaveNoteType[][]>(
    new Array(numStaves).fill([])
  );
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isEnterNotesActive, setIsEnterNotesActive] = useState(false);
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
    setIsEnterNotesActive(false);
  };

  const enterNotes = () => {
    setIsEnterNotesActive(!isEnterNotesActive);
    setIsEraserActive(false);
  };

  const CreateRenderer = () => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
  };

  const RenderStavesAndNotes = () => {
    const renderer = rendererRef.current;
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context?.clear();
    if (context) {
      context &&
        setStaves(() =>
          KaseyBlankStaves(numStaves, context, 240, 180, 10, 40, clef, timeSig)
        );
    }
    notes.forEach((staveNotes, index) => {
      if (staveNotes.length > 0) {
        context && Formatter.FormatAndDraw(context, staves[index], staveNotes);
      }
    });
  };

  const clearMeasures = () => {
    setNotes(() => {
      const newArrays = new Array(numStaves).fill([]);
      return newArrays;
    });
    CreateRenderer();
    RenderStavesAndNotes();
  };

  useEffect(() => {
    CreateRenderer();
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer && renderer.getContext();
    context?.setFont("Arial", 10);
    context &&
      setStaves(KaseyBlankStaves(4, context, 240, 180, 10, 40, clef, timeSig));
  }, []);

  useEffect(() => {
    RenderStavesAndNotes();
  }, [notes]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = container.current?.getBoundingClientRect();
    let x = rect ? e.clientX - rect.left : 0;
    const y = rect ? e.clientY - rect.top : 0;

    let findNoteObject = generateNoteCoordinates(35, notesArray).find(
      ({ yCoordinateMin, yCoordinateMax }) =>
        y >= yCoordinateMin && y <= yCoordinateMax
    );
    const newBarIndex = findBar(x, 240, 420, 600);
    let newNotes = [...notes];
    if (!findNoteObject) {
      setNoteNotFound(true);
    } else if (isEraserActive) {
      if (newNotes[newBarIndex]) {
        newNotes[newBarIndex].pop();
      }
    } else if (
      newNotes[newBarIndex] &&
      newNotes[newBarIndex].length >= beatsInMeasure
    ) {
      setTooManyBeatsInMeasure(true);
    } else {
      const newStaveNote: StaveNoteType = new StaveNote({
        keys: findNoteObject && [findNoteObject.note],
        duration: "q",
      });
      newNotes[newBarIndex] = [...newNotes[newBarIndex], newStaveNote];
    }
    setNotes(() => newNotes);
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
        {renderBlueButton(clearMeasures, "Clear Measures")}
      </div>
    </>
  );
};

export default EraseNotesFromOneStave;
