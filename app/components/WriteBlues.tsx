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

type WriteBluesProps = {
  numBars?: number;
  chords?: Chord[];
  width: number;
  handleBlues: (blues: InputData) => void;
};

const initialBluesInputState = createInitialState(48);

export default forwardRef(function WriteBlues(
  { width, handleBlues }: WriteBluesProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialBluesInputState
  );

  const chordWidth = width * 0.0415;
  const gapWidth = chordWidth * 0.22;
  const chordGroupSpacing = chordWidth * 0.1;

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `repeat(4, ${chordWidth.toString()}px)`,
    gap: gapWidth.toString() + "px",
  };

  function handleNumeralSubmit(e: FormEvent) {
    e.preventDefault();
    handleBlues(numeralInput);
  }

  function renderNumeralInputs(
    start: number | undefined,
    end: number | undefined
  ) {
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
  }

  return (
    <div>
      <form ref={ref} id="submit-form-blues" onSubmit={handleNumeralSubmit}>
        <Stack direction="column">
          <Staff numBars={4} width={width} />
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            sx={{ paddingLeft: 13, paddingRight: 6 }}
          >
            <div style={gridInputInline}>{renderNumeralInputs(0, 4)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(4, 8)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(8, 12)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(12, 16)}</div>
          </Stack>
          <Staff numBars={4} noTimeSignature={true} width={width} />
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            sx={{ paddingLeft: 13 }}
          >
            <div style={gridInputInline}>{renderNumeralInputs(16, 20)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(20, 24)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(24, 28)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(28, 32)}</div>
          </Stack>
          <Staff
            numBars={4}
            noTimeSignature={true}
            addDoubleBarLine={true}
            width={width}
          />
          <Stack
            direction="row"
            spacing={chordGroupSpacing}
            sx={{ paddingLeft: 13 }}
          >
            <div style={gridInputInline}>{renderNumeralInputs(32, 36)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(36, 40)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(40, 44)}</div>
            <div style={gridInputInline}>{renderNumeralInputs(44, 48)}</div>
          </Stack>
        </Stack>
      </form>
    </div>
  );
});
