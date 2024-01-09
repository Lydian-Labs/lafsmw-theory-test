"use client";
import React, { useRef, useEffect, useState } from "react";
import VexFlow from "vexflow";
import KaseyBlankStaves from "../components/KaseyBlankStaves";
import { Snackbar, Alert } from "@mui/material/";
import BlueButton from "../components/BlueButton";
import findBar from "../components/findBar";
import noteArray from "@/lib/noteArray";
import generateNoteCoordinates from "../components/generateNoteCoordinates";
import CheckNumBeatsInMeasure from "../components/CheckNumBeatsInMeasure";
const VF = VexFlow.Flow;
const { Formatter, Renderer, StaveNote, Stave } = VF;

type StaveType = InstanceType<typeof Stave>;
type StaveNoteType = InstanceType<typeof StaveNote>;

const AddNotesToAStaff = () => {
  const [noteNotFound, setNoteNotFound] = useState(false);
  const [tooManyBeatsInMeasure, setTooManyBeatsInMeasure] = useState(false);
  const [isEraserActive, setIsEraserActive] = useState(false);
  const [isEnterNotesActive, setIsEnterNotesActive] = useState(false);
  const [staveNotes, setStaveNotes] = useState<StaveNoteType[]>([]);

  const [staves, setStaves] = useState<StaveType[]>([]);
  //refs
  const rendererRef = useRef<InstanceType<typeof Renderer> | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  const clearMeasures = () => {
    setNoteNotFound(false);
    window.location.reload();
  };

  const eraser = () => {
    setIsEraserActive(!isEraserActive);
    setIsEnterNotesActive(false);
  };
  const enterNotes = () => {
    setIsEnterNotesActive(!isEnterNotesActive);
    setIsEraserActive(false);
  };
  const renderEraseNotesButton = () => (
    <BlueButton onClick={eraser} isEnabled={isEraserActive}>
      {"Eraser"}
    </BlueButton>
  );

  const renderEnterNotesButton = () => (
    <BlueButton onClick={enterNotes} isEnabled={isEnterNotesActive}>
      {"Enter Notes"}
    </BlueButton>
  );
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
    const containerRef = container.current;
    const renderer = rendererRef.current;
    renderer?.resize(800, 300);
    const context = renderer ? renderer.getContext() : null;
    context?.setFont("Arial", 10);

    setStaves((prevState: StaveType[]) => {
      const arrayOfBlankStaves =
        context &&
        KaseyBlankStaves(4, context, 240, 180, 10, 40, "treble", timeSig);
      // If arrayOfBlankStaves is not null, spread it into the new state
      // Otherwise, return the previous state
      return arrayOfBlankStaves
        ? [...prevState, ...arrayOfBlankStaves]
        : prevState;
    });

    const handleClick = (e: MouseEvent) => {
      context?.clear();
      console.log(staves);
      const rect = container.current?.getBoundingClientRect();
      const x = rect ? e.clientX - rect.left : 0;
      const y = rect ? e.clientY - rect.top : 0;

      // const singleBarBlankStave =
      //   arrayOfBlankStaves && arrayOfBlankStaves[barIndex];

      let findNoteObject = generateNoteCoordinates(35, notesArray).find(
        ({ yCoordinateMin, yCoordinateMax }) =>
          y >= yCoordinateMin && y <= yCoordinateMax
      );
      //functional update form. Never mutate the array directly
      if (isEraserActive && findNoteObject) {
        setStaveNotes((currentStaveNotes) => {
          const newStavesNotes = [...currentStaveNotes];
          newStavesNotes.pop();
          return newStavesNotes;
        });
        return;
      }

      if (!findNoteObject) {
        setNoteNotFound(true);
        return;
      } else if (staveNotes && staveNotes.length >= beatsInMeasure) {
        setTooManyBeatsInMeasure(true);
      } else {
        const staveNote = new StaveNote({
          keys: findNoteObject && [findNoteObject.note],
          duration: "q",
        });
        setStaveNotes((currentStaveNotes) => [...currentStaveNotes, staveNote]);
        return;
      }
    };

    container.current?.addEventListener("click", handleClick);
    return () => {
      containerRef?.removeEventListener("click", handleClick);
    };
  }, [beatsInMeasure, notesArray, isEraserActive, staveNotes, staves]);

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
        {renderEnterNotesButton()}
        {renderEraseNotesButton()}
      </div>
    </div>
  );
};

export default AddNotesToAStaff;
