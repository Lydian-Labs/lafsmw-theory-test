"use client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import ChordNames from "../components/ChordNames";
import IdentifyChords from "../components/IdentifyChords";
import IdentifyKeySignatures from "../components/IdentifyKeySignatures";
import Staff from "../components/Staff";
import SubmitButton from "../components/SubmitButton";
import WriteBlues from "../components/WriteBlues";
import WriteProgression from "../components/WriteProgression";
import keySignaturesText from "../lib/data/keySignaturesText";
import scalesText from "../lib/data/scalesText";
import seventhChords from "../lib/data/seventhChords";
import seventhChordsText from "../lib/data/seventhChordsText";
import triadsText from "../lib/data/triadsText";
import { InputData, SelectEvent } from "../types";

type Level =
  | "advanced-theory"
  | "advanced-improvisation"
  | "intro-to-arranging"
  | "intermediate-arranging"
  | "advanced-arranging"
  | "rhythm-class"
  | "sibelius-class"
  | "";

type InputState = {
  level: Level;
  keySignatures: InputData;
  chords: InputData;
  progressions: InputData;
  blues: InputData;
};

const initialFormInputState: InputState = {
  level: "",
  keySignatures: {},
  chords: {},
  progressions: {},
  blues: {},
};

export default function ExamSample() {
  const [formInput, setFormInput] = useState(initialFormInputState);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disableKeySignatures, setDisableKeySignatures] = useState(false);
  const [disableChords, setDisableChords] = useState(false);
  const [disableProgressions, setDisableProgressions] = useState(false);
  const [disableBlues, setDisableBlues] = useState(false);

  useEffect(() => {
    setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    setHeight(typeof window !== "undefined" ? window.innerHeight : 0);
  }, []);

  const bluesFormRef = useRef<HTMLFormElement | null>(null);
  const progressionFormRef = useRef<HTMLFormElement | null>(null);
  const chordsFormRef = useRef<HTMLFormElement | null>(null);
  const keysFormRef = useRef<HTMLFormElement | null>(null);

  function savePDF() {
    const capture = document.querySelector(".actual-exam");
    setLoading(true);
    html2canvas(capture as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      // p is portrait, px is pixels (could be mm as millimeters also), 3rd argument is paper size, could also be "a4" or "letter", but using an array for custom size
      const doc = new jsPDF("p", "px", [width, height]);
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      // 0 and 0 are x and y coordinates
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoading(false);
      doc.save("exam.pdf");
    });
  }

  function handleLevel(event: SelectEvent) {
    const selectedLevel = event.target.value as Level;
    setFormInput((prevInput) => ({ ...prevInput, level: selectedLevel }));
  }

  function handleKeySignatures(input: InputData) {
    setFormInput({ ...formInput, keySignatures: input });
    setDisableKeySignatures(true);
  }

  function handleChords(input: InputData) {
    setFormInput({ ...formInput, chords: input });
    setDisableChords(true);
  }

  function handleProg(input: InputData) {
    setFormInput({ ...formInput, progressions: input });
    setDisableProgressions(true);
  }

  function handleBlues(input: InputData) {
    setFormInput({ ...formInput, blues: input });
    setDisableBlues(true);
  }

  const { scales1, scales2, scales3 } = scalesText;

  return (
    <Box className="actual-exam">
      <Grid container spacing={4} minHeight={500}>
        <Grid item xs={12}>
          <h1 className="text-3xl text-center mt-12">LAFSMW Theory Test</h1>
        </Grid>
        <Grid item xs={12}>
          <label
            className="ml-4 mt-4 text-xl text-center"
            htmlFor="level-select"
          >
            Choose your Level IV class preference:
          </label>

          <select name="levels" id="level-select" onChange={handleLevel}>
            <option value="">Please choose an option</option>
            <option value="advanced-theory">Advanced theory</option>
            <option value="advanced-improvisation">
              Advanced improvisation
            </option>
            <option value="intro-to-arranging">Intro to arranging</option>
            <option value="intermediate-arranging">
              Intermediate arranging
            </option>
            <option value="advanced-arranging">Advanced arranging</option>
            <option value="rhythm-class">Rhythm class</option>
            <option value="sibelius-class">Sibelius class</option>
          </select>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following key signatures:</h2>
            <Staff addDoubleBarLine={true} width={width} />
            <ChordNames width={width} chordNames={keySignaturesText} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Identify the following key signatures:
            </h2>
            <IdentifyKeySignatures
              numBars={4}
              handleKeySignatures={handleKeySignatures}
              ref={keysFormRef}
              width={width}
            />
          </div>
        </Grid>
        <SubmitButton
          labelText="Submit"
          sx={{ mt: 4 }}
          onClick={() => {
            keysFormRef.current?.requestSubmit();
          }}
          disabled={disableKeySignatures}
        />
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following scales:</h2>
            <Staff numBars={2} width={width} />
            <ChordNames width={width} chordNames={scales1} />
            <Staff numBars={2} noTimeSignature={false} width={width} />
            <ChordNames width={width} chordNames={scales2} />
            <Staff
              numBars={2}
              noTimeSignature={false}
              addDoubleBarLine={true}
              width={width}
            />
            <ChordNames width={width} chordNames={scales3} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following triads:</h2>
            <Staff numBars={6} addDoubleBarLine={true} width={width} />
            <ChordNames width={width} chordNames={triadsText} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">Write the following 7th chords:</h2>
            <Staff numBars={7} addDoubleBarLine={true} width={width} />
            <ChordNames width={width} chordNames={seventhChordsText} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <h2 className="ml-4 mt-4">Identify the following 7th chords:</h2>
          <IdentifyChords
            chords={seventhChords}
            numBars={7}
            handleChords={handleChords}
            ref={chordsFormRef}
            width={width}
          />
        </Grid>
        <SubmitButton
          labelText="Submit"
          sx={{ mt: 4 }}
          onClick={() => {
            chordsFormRef.current?.requestSubmit();
          }}
          disabled={disableChords}
        />
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write a I-IV-V progression in the following keys:
            </h2>
            <WriteProgression
              numBars={12}
              handleProg={handleProg}
              ref={progressionFormRef}
              width={width}
            />
          </div>
        </Grid>
        <SubmitButton
          labelText="Submit"
          sx={{ mt: 4 }}
          onClick={() => {
            progressionFormRef.current?.requestSubmit();
          }}
          disabled={disableProgressions}
        />
        <Grid item xs={12}>
          <div>
            <h2 className="ml-4 mt-4">
              Write the changes to a Bb blues using ii-V7-I in the last 4
              measures (extra credit for hip reharms in the first 8 measures):
            </h2>
            <WriteBlues
              handleBlues={handleBlues}
              ref={bluesFormRef}
              width={width}
            />
          </div>
        </Grid>
        <SubmitButton
          labelText="Submit"
          sx={{ mb: 4, mt: 4 }}
          onClick={() => {
            bluesFormRef.current?.requestSubmit();
          }}
          disabled={disableBlues}
        />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <SubmitButton
            labelText="End Exam"
            sx={{ mb: 8, mt: 1 }}
            onClick={savePDF}
          />
        )}
      </Grid>
    </Box>
  );
}
