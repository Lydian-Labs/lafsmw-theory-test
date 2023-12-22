import { ForwardedRef, forwardRef, useState } from "react";
import { ChangeEvent, FormEvent, KeySignatureProps } from "../types";
import Staff from "./Staff";
import FormInput from "./FormInput";
import createInitialState from "../lib/createInitialState";

export default forwardRef(function IdentifyKeySignatures(
  { numBars = 4, width = 1650, handleKeySignatures }: KeySignatureProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialKeysInputState = createInitialState(numBars);

  const [keysInput, setKeysInput] = useState<Record<string, string>>(
    initialKeysInputState
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

  function handleKeysSubmit(e: FormEvent) {
    // prevents browser from refreshing on submit
    e.preventDefault();
    console.log("keysInput:", keysInput);
    handleKeySignatures(keysInput);
  }

  const renderKeysInputs = () => {
    return Object.keys(keysInput).map((key) => (
      <FormInput
        key={key}
        name={key}
        type="text"
        value={keysInput[key]}
        width="70px"
        onChange={(e: ChangeEvent) =>
          setKeysInput({ ...keysInput, [key]: e.target.value })
        }
        required={false}
      />
    ));
  };

  return (
    <div>
      <form ref={ref} id="submit-form-keys" onSubmit={handleKeysSubmit}>
        <Staff addDoubleBarLine={true} numBars={numBars} width={width} />
        <div style={gridInputInline}>{renderKeysInputs()}</div>
      </form>
    </div>
  );
});
