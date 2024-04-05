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

type IdentifyNotationProps = {
  numBars?: number;
  chords?: Chord[];
  width: number;
  handleInput: (input: InputData) => void;
};

export default forwardRef(function IdentifyNotation(
  {
    numBars = 4,
    chords = [],
    width = 1650,
    handleInput,
  }: IdentifyNotationProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialChordsInputState = createInitialState(numBars);

  const [textInput, setTextInput] = useState<Record<string, string>>(
    initialChordsInputState
  );

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

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault();
    handleInput(textInput);
  }

  const renderTextInputs = () => {
    return Object.keys(textInput).map((key) => (
      <FormInput
        key={key}
        name={key}
        type="text"
        value={textInput[key]}
        width="70px"
        onChange={(e: ChangeEvent) =>
          setTextInput({ ...textInput, [key]: e.target.value })
        }
        required={false}
      />
    ));
  };

  return (
    <div>
      <form ref={ref} id="submit-form-chords" onSubmit={handleInputSubmit}>
        <Staff
          addDoubleBarLine={true}
          numBars={numBars}
          chords={chords}
          width={width}
        />
        <div style={gridInputInline}>{renderTextInputs()}</div>
      </form>
    </div>
  );
});
