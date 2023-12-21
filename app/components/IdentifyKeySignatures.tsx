import { ForwardedRef, forwardRef, useState } from "react";
import { ChangeEvent, FormEvent, KeySignatureProps } from "../types";
import BlankStaff from "./BlankStaff";
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
        <BlankStaff addDoubleBarLine={true} numBars={numBars} width={width} />
        {/* this grid-cols-4 is a hacky way to make the form inputs line up with the staff */}
        <div className="grid grid-cols-4 pl-10">{renderKeysInputs()}</div>
      </form>
    </div>
  );
});
