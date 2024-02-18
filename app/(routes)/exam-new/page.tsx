"use client";
import { ChangeEvent, ReactNode, useRef, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
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
  const [selectedValue, setSelectedValue] = useState("sibelius-class");

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log("formInput:", formInput);
    setLoading(false);
  };

  const handleLevel = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setFormInput((prev) => {
      return {
        ...prev,
        level: event.target.value as Level,
      };
    });
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography variant="h2" align="center" color="secondary.main">
        Section 1: Key Signatures
      </Typography>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="level-select-label">
            Choose your Level IV class preference:
          </InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={selectedValue}
            onChange={handleLevel}
          >
            <MenuItem value="sibelius-class">Sibelius class</MenuItem>
            <MenuItem value="rhythm-class">Rhythm class</MenuItem>
            <MenuItem value="intro-to-arranging">Intro to arranging</MenuItem>
            <MenuItem value="intermediate-arranging">
              Intermediate arranging
            </MenuItem>
            <MenuItem value="advanced-arranging">Advanced arranging</MenuItem>
            <MenuItem value="advanced-theory">Advanced theory</MenuItem>
            <MenuItem value="advanced-improvisation">
              Advanced improvisation
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Container>
  );
}
