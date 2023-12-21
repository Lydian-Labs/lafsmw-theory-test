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
        {/* this grid-cols-4 is a hacky way to make the form inputs line up with the staff */}
        <div className="grid grid-cols-7 pl-10">{renderChordsInputs()}</div>
      </form>
    </div>
  );
});
