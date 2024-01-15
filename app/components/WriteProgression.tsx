import Stack from "@mui/material/Stack";
import { ForwardedRef, forwardRef, useState } from "react";
import createInitialState from "../lib/createInitialState";
import gatherWidthInfo from "../lib/gatherWidthInfo";
import {
  ChangeEvent,
  Chord,
  FormEvent,
  InputData,
} from "../typesAndInterfaces";
import FormInput from "./FormInput";
import Staff from "./Staff";

type WriteProgProps = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleProg: (progressions: InputData) => void;
};

export default forwardRef(function WriteProgression(
  { numBars = 4, width, handleProg }: WriteProgProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialNumeralInputState = createInitialState(numBars);

  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialNumeralInputState
  );

  numBars = numBars / 3;

  // Gather needed width info.
  const { widthOfFirstBar, widthOfRemainingBars } = gatherWidthInfo(
    numBars,
    width
  );

  const remainingBarsString = (numBars - 1).toString();

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `${widthOfFirstBar}px repeat(${remainingBarsString}, ${widthOfRemainingBars}px)`,
    paddingLeft: "5rem",
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
          width="70px"
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
          <div style={gridInputInline}>{renderNumeralInputs(0, 4)}</div>
          <Staff numBars={4} noTimeSignature={true} width={width} />
          <div style={gridInputInline}>{renderNumeralInputs(4, 8)}</div>
          <Staff
            numBars={4}
            noTimeSignature={true}
            addDoubleBarLine={true}
            width={width}
          />
          <div style={gridInputInline}>{renderNumeralInputs(8, 12)}</div>
        </Stack>
      </form>
    </div>
  );
});
