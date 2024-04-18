import Stack from "@mui/material/Stack";
import { ForwardedRef, forwardRef, useState } from "react";
import createInitialState from "../lib/createInitialState";
import {
  ChangeEvent,
  Chord,
  FormEvent,
  InputData,
} from "../lib/typesAndInterfaces";
import FormInput from "./FormInput";
import Staff from "./Staff";

type WriteProgProps = {
  numBars?: number;
  chords?: Chord[];
  width: number;
  handleProg: (progressions: InputData) => void;
};

const initialProgressionInputState = createInitialState(18);

export default forwardRef(function WriteProgression(
  { width, handleProg }: WriteProgProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialProgressionInputState
  );

  const chordWidth = width * 0.0415;
  const gapWidth = chordWidth * 0.65;
  const chordGroupSpacing = chordWidth * 0.1;

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `repeat(4, ${chordWidth.toString()}px)`,
    gap: gapWidth.toString() + "px",
  };

  const gridInputInline2 = {
    display: "grid",
    gridTemplateColumns: `repeat(2, ${(chordWidth * 2).toString()}px)`,
    gap: (gapWidth * 2).toString() + "px",
  };

  function handleNumeralSubmit(e: FormEvent) {
    e.preventDefault();
    handleProg(numeralInput);
  }

  const renderNumeralInputs = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return Object.keys(numeralInput)
      .slice(start, end)
      .map((key) => (
        <FormInput
          key={key}
          name={key}
          type="text"
          value={numeralInput[key]}
          width={chordWidth.toString() + "px"}
          onChange={(e: ChangeEvent) =>
            setNumeralInput({ ...numeralInput, [key]: e.target.value })
          }
          required={false}
        />
      ));
  };

  return (
    <div>
      <form
        ref={ref}
        id="submit-form-progression"
        onSubmit={handleNumeralSubmit}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            marginLeft="100px"
            gap={4}
          >
            <span style={gridInputInline2}>C major</span>
            <span style={gridInputInline2}>E minor</span>
            <span style={gridInputInline2}>Db major</span>
          </Stack>
          <Staff numBars={6} width={width} />
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            sx={{ paddingLeft: 13, paddingRight: 6, marginBottom: 6 }}
          >
            <div style={gridInputInline}>{renderNumeralInputs(0, 3)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(3, 6)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(6, 9)}</div>
          </Stack>
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            marginLeft="100px"
            gap={4}
          >
            <span style={gridInputInline2}>C# minor</span>
            <span style={gridInputInline2}>D# major</span>
            <span style={gridInputInline2}>Gb minor</span>
          </Stack>
          <Staff numBars={6} noTimeSignature width={width} addDoubleBarLine />
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            sx={{ paddingLeft: 13 }}
          >
            <div style={gridInputInline}>{renderNumeralInputs(9, 12)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(12, 15)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(15, 18)}</div>
          </Stack>
        </Stack>
      </form>
    </div>
  );
});
