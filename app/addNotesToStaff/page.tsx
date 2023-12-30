"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { Snackbar, Alert } from "@mui/material/";
import BlueButton from "../components/BlueButton";
import FindXcoordinate from "../components/FindXcoordinate";
import noteArray from "@/lib/noteArray";

import GenerateNoteArrayCoordinates from "../components/GenerateNoteArrayCoordinates";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;

const AddNotesToAStaff = () => {
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);

  //refs
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const notesRef = useRef<object[]>([]);

  const clearMeasures = () => {
    setNoteNotFound(false);
    window.location.reload();
  };

  //variables that don't need to be inside useEffect
  const eraser = () => {
    setIsEraserActive(!isEraserActive);
  };
  const notesArray = noteArray();
  const timeSig = "4/4";
  const beatsInMeasure = parseInt(timeSig.split("/")[0]);

  useEffect(() => {
    if (!rendererRef.current && container.current) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }

    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer ? renderer.getContext() : null;
    context?.setFont("Arial", 10);

    //newStavesArray creates an array of 4 stave objects each with a stave and notes property. The notes property consists of an array of StaveNotes
    const newStavesArray = context
      ? KaseyBlankStaves(4, context, 240, 180, 10, 40, "treble", timeSig)
      : null;

    container.current?.addEventListener("click", (e) => {
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;
      //FindXcoordinate returns the measure the user clicked in
      const staveIndex = FindXcoordinate(x, 240, 420, 600);

      //staveDetailsObject returns the object with stave and noteArray info about the particular stave the user clicked in
      const staveDetailsObject = newStavesArray && newStavesArray[staveIndex];

      //GenerateNoteArrayCoordinate generates a new array of objects that contain 3 properties each: note (string), yMin and yMax
      //noteDataObject returns the object that matches the y coordinate that was clicked on
      let noteDataObject = GenerateNoteArrayCoordinates(35, notesArray).find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          y >= yCoordinateMin && y <= yCoordinateMax
      );

      context?.clear();
      if (!noteDataObject) {
        setNoteNotFound(true);
      } else if (
        staveDetailsObject &&
        staveDetailsObject.notes.length >= beatsInMeasure
      ) {
        setTooManyBeatsInMeasure(true);
      } else {
        const staveNote = new StaveNote({
          keys: noteDataObject && [noteDataObject.note],
          duration: "q",
        });
        //pushing staveNote to the notes array inside StaveDetailsObject
        staveDetailsObject?.notes.push(staveNote);
        staveDetailsObject &&
          notesRef.current.push({ ...staveDetailsObject.notes, staveNote });
      }
      newStavesArray?.forEach(({ stave, notes }) => {
        if (context) {
          stave.setContext(context).draw();
          const validNotes = notes.filter((note) => note instanceof StaveNote);
          if (validNotes.length > 0) {
            Formatter.FormatAndDraw(context, stave, validNotes);
            // console.log("stave: ", stave, " validNotes: ", validNotes);
          }
        }
      });
    });
  }, [beatsInMeasure, notesArray]);

  return (
    <div>
      <div ref={container} className=" mt-[10em]">
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
      </div>
      <div style={{ marginLeft: "5%" }}>
        <BlueButton onClick={clearMeasures}>Clear Measures</BlueButton>
        <BlueButton onClick={eraser}>{"Eraser"}</BlueButton>
      </div>
    </div>
  );
};

export default AddNotesToAStaff;
