import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import { Clef } from "../lib/typesAndInterfaces";

const ClefPreferenceSelector = ({ clef, setClef }: Clef) => {
  function handleClef(event) {
   setClef(event.target.value)
  }
  return (
    <FormControl size="small" fullWidth>
     <RadioGroup row value={clef} onChange={handleClef}>
        <FormControlLabel value={"treble-clef"} control={<Radio />} label="Treble Clef"/>
        <FormControlLabel value={"bass-clef"} control={<Radio />} label="Bass Clef"/>
     </RadioGroup>
    </FormControl>
  );
};

export default ClefPreferenceSelector;
