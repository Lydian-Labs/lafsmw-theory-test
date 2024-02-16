"use client";
import { ChangeEvent, useRef, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { InputData } from "../../lib/typesAndInterfaces";

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

export default function ExamNew() {
  const [formInput, setFormInput] = useState(initialFormInputState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log("formInput:", formInput);
    setLoading(false);
  };

  const handleLevel = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormInput((prev) => {
      return {
        ...prev,
        level: event.target.value as Level,
      };
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" align="center">
        Section 1: Key Signatures
      </Typography>

      <Grid item xs={12}>
        <label className="ml-4 mt-4 text-xl text-center" htmlFor="level-select">
          Choose your Level IV class preference:
        </label>
        <select name="levels" id="level-select" onChange={handleLevel}>
          <option value="sibelius-class">Sibelius class</option>
          <option value="rhythm-class">Rhythm class</option>
          <option value="intro-to-arranging">Intro to arranging</option>
          <option value="intermediate-arranging">Intermediate arranging</option>
          <option value="advanced-arranging">Advanced arranging</option>
          <option value="advanced-theory">Advanced theory</option>
          <option value="advanced-improvisation">Advanced improvisation</option>
        </select>
      </Grid>
    </Container>
  );
}
