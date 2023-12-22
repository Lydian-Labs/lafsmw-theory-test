import { ForwardedRef, forwardRef, useState } from "react";
import { ChangeEvent, FormEvent, WriteProps } from "../types";
import FormInput from "./FormInput";
import Staff from "./Staff";
import createInitialState from "../lib/createInitialState";

export default forwardRef(function IdentifyChords(
  { numBars = 4, chords = [], width = 1650, handleChords }: WriteProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialChordsInputState = createInitialState(numBars);

  const [chordsInput, setChordsInput] = useState<Record<string, string>>(
    initialChordsInputState
  );

  // Gather needed width info.
  const fullWidth = width * 0.97;
  const widthOfFirstBar = width / numBars;
  const widthOfRemainingBars =
    (fullWidth - widthOfFirstBar - 90) / (numBars - 1);

  const remainingBarsString = (numBars - 1).toString();

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `${widthOfFirstBar}px repeat(${remainingBarsString}, ${widthOfRemainingBars}px)`,
    paddingLeft: "5rem",
  };

  function handleChordsSubmit(e: FormEvent) {
    // prevents browser from refreshing on submit
    e.preventDefault();
    console.log("chordsInput:", chordsInput);
    handleChords(chordsInput);
  }

  const renderChordsInputs = () => {
    return Object.keys(chordsInput).map((key) => (
      <FormInput
        key={key}
        name={key}
        type="text"
        value={chordsInput[key]}
        width="70px"
        onChange={(e: ChangeEvent) =>
          setChordsInput({ ...chordsInput, [key]: e.target.value })
        }
        required={false}
      />
    ));
  };

  return (
    <div>
      <form ref={ref} id="submit-form-chords" onSubmit={handleChordsSubmit}>
        <Staff
          addDoubleBarLine={true}
          numBars={numBars}
          chords={chords}
          width={width}
        />
        <div style={gridInputInline}>{renderChordsInputs()}</div>
      </form>
    </div>
  );
});
