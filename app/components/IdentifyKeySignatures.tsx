import { ForwardedRef, forwardRef, useState } from "react";
import createInitialState from "../lib/createInitialState";
import gatherWidthInfo from "../lib/gatherWidthInfo";
import {
  ChangeEvent,
  Chord,
  FormEvent,
  InputData,
} from "../lib/typesAndInterfaces";
import FormInput from "./FormInput";
import Staff from "./Staff";
import { useClef } from "../context/ClefContext";
type IdentifyKeySignatureProps = {
  numBars: number;
  chords?: Chord[];
  width: number;
  handleKeySignatures: (keySignatures: InputData) => void;
};

export default forwardRef(function IdentifyKeySignatures(
  { numBars = 4, width = 1650, handleKeySignatures }: IdentifyKeySignatureProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialKeysInputState = createInitialState(numBars);

  const [keysInput, setKeysInput] = useState<Record<string, string>>(
    initialKeysInputState
  );

  const { clef } = useClef();

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

  function handleKeysSubmit(e: FormEvent) {
    e.preventDefault();
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
        <Staff
          clef={clef}
          addDoubleBarLine={true}
          numBars={numBars}
          width={width}
        />
        <div style={gridInputInline}>{renderKeysInputs()}</div>
      </form>
    </div>
  );
});
