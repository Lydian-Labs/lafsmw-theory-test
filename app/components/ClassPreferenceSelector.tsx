import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Level } from "../lib/typesAndInterfaces";

export default function ClassPreferenceSelector({
  setFormInput,
  formInput,
}: {
  setFormInput: any;
  formInput: any;
}) {
  const [selectedValue, setSelectedValue] = useState("sibelius-class");

  function handleLevel(event: SelectChangeEvent) {
    const selectedLevel = event.target.value as Level;
    setSelectedValue(selectedLevel);
    setFormInput({ ...formInput, level: selectedLevel });
  }

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
