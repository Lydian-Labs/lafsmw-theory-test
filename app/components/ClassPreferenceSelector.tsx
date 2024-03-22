import React, { ReactNode, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

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
  keySignatures: {};
  chords: {};
  progressions: {};
  blues: {};
};

const initialFormInputState: InputState = {
  level: "",
  keySignatures: {},
  chords: {},
  progressions: {},
  blues: {},
};

export default function ClassPreferenceSelector() {
  const [formInput, setFormInput] = useState(initialFormInputState);
  const [selectedValue, setSelectedValue] = useState("sibelius-class");

  // const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   setSelectedValue(event.target.value);
  //   console.log("formInput:", formInput);
  //   setLoading(false);
  // };

  const handleLevel = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setFormInput((prev) => {
      return {
        ...prev,
        level: event.target.value as Level,
      };
    });
  };

  return (
    <FormControl>
      <InputLabel id="class-preference-label">Class Preference</InputLabel>
      <Select
        labelId="class-preference-label"
        id="class-preference-select"
        value={selectedValue}
        label="Class Preference"
        onChange={handleLevel}
      >
        <MenuItem value="advanced-theory">Advanced Theory</MenuItem>
        <MenuItem value="advanced-improvisation">
          Advanced Improvisation
        </MenuItem>
        <MenuItem value="intro-to-arranging">Intro to Arranging</MenuItem>
        <MenuItem value="intermediate-arranging">
          Intermediate Arranging
        </MenuItem>
        <MenuItem value="advanced-arranging">Advanced Arranging</MenuItem>
        <MenuItem value="rhythm-class">Rhythm Class</MenuItem>
        <MenuItem value="sibelius-class">Sibelius Class</MenuItem>
      </Select>
    </FormControl>
  );
}
