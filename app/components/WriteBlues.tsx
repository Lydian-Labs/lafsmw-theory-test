import Stack from "@mui/material/Stack";
import { ForwardedRef, forwardRef, useState } from "react";
import createInitialState from "../lib/createInitialState";
import { ChangeEvent, Chord, FormEvent, InputData } from "../types";
import FormInput from "./FormInput";
import Staff from "./Staff";

type WriteBluesProps = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleBlues: (blues: InputData) => void;
};

const initialBluesInputState = createInitialState(48);

export default forwardRef(function WriteBlues(
  { numBars = 4, width, handleBlues }: WriteBluesProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialBluesInputState
  );

  // function gatherWidthInfoBlues(
  //   currentNumBars: number,
  //   currentInnerWidth: number
  // ) {
  //   const widthOfFirstBar = currentInnerWidth / currentNumBars;
  //   const widthOfRemainingBars =
  //     (currentInnerWidth - widthOfFirstBar - 90) / (currentNumBars - 1);

  //   return { widthOfFirstBar, widthOfRemainingBars };
  // }

  numBars = numBars * 4;

  let chordWidth = (width * 0.97) / numBars;

  // Gather needed width info.
  // const { widthOfFirstBar, widthOfRemainingBars } = gatherWidthInfoBlues(
  //   numBars,
  //   width
  // );

  const numBarsString = numBars.toString();
  // const remainingBarsString = (numBars - 1).toString();

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `repeat(${numBarsString}, ${numBarsString}px)`,
    paddingLeft: "6rem",
    gap: "23px",
  };
  // const gridInputInline = {
  //   display: "grid",
  //   gridTemplateColumns: `${widthOfFirstBar}px repeat(${remainingBarsString}, ${widthOfRemainingBars}px)`,
  //   paddingLeft: "5rem",
  // };

  function handleNumeralSubmit(e: FormEvent) {
    e.preventDefault();
    handleBlues(numeralInput);
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
          width="40px"
          onChange={(e: ChangeEvent) =>
            setNumeralInput({ ...numeralInput, [key]: e.target.value })
          }
          required={false}
        />
      ));
  };

  return (
    <div>
      <form ref={ref} id="submit-form-blues" onSubmit={handleNumeralSubmit}>
        <Stack direction="column">
          <Staff numBars={4} width={width} />
          <div style={gridInputInline}>{renderNumeralInputs(0, 16)}</div>
          <Staff numBars={4} noTimeSignature={true} width={width} />
          <div style={gridInputInline}>{renderNumeralInputs(16, 32)}</div>
          <Staff
            numBars={4}
            noTimeSignature={true}
            addDoubleBarLine={true}
            width={width}
          />
          <div style={gridInputInline}>{renderNumeralInputs(32, 48)}</div>
        </Stack>
      </form>
    </div>
  );
});
