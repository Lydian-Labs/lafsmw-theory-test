"use client";
import { ForwardedRef, forwardRef, useEffect, useMemo, useState } from "react";
import { useClef } from "../context/ClefContext";
import createInitialState from "../lib/createInitialState";
import isCurrentDataFilled from "../lib/isCurrentDataFilled";
import {
  ChangeEvent,
  Chord,
  FormEvent,
  InputData,
} from "../lib/typesAndInterfaces";
import FormInput from "./FormInput";
import KeySigStaff from "./KeySigStaff";
interface TextInput {
  [key: string]: string;
}

type IdentifyNotationProps = {
  numBars?: number;
  evenbars?: boolean;
  chords?: Chord[];
  width: number;
  currentData?: TextInput;
  handleInput: (input: InputData) => void;
};

export default forwardRef(function IdentifyKeySigNotation(
  {
    numBars = 4,
    evenbars = false,
    chords = [],
    width = 1650,
    handleInput,
    currentData,
  }: IdentifyNotationProps,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialChordsInputState = useMemo(
    () => createInitialState(numBars),
    [numBars]
  );

  const [textInput, setTextInput] = useState<Record<string, string>>(
    initialChordsInputState
  );

  const { clef } = useClef();

  useEffect(() => {
    if (!currentData || !isCurrentDataFilled(currentData)) {
      setTextInput(initialChordsInputState);
    } else {
      setTextInput(currentData);
    }
  }, [currentData, initialChordsInputState]);

  const fullWidth = width * 0.97;
  const reducedWidth = fullWidth - 90;

  let widthOfFirstBar;
  let widthOfRemainingBars;

  if (evenbars === false) {
    widthOfFirstBar = fullWidth / numBars;
    widthOfRemainingBars = (fullWidth - widthOfFirstBar - 90) / (numBars - 1);
  } else {
    widthOfFirstBar = reducedWidth / numBars;
    widthOfRemainingBars = widthOfFirstBar;
  }

  const remainingBarsString = (numBars - 1).toString();

  const gridInputInline = {
    display: "grid",
    gridTemplateColumns: `${widthOfFirstBar}px repeat(${remainingBarsString}, ${widthOfRemainingBars}px)`,
    paddingLeft: evenbars ? "1rem" : "5.5rem",
    gap: "20px"
  };

  function handleInputSubmit(e: FormEvent) {
    e.preventDefault();
    handleInput(textInput);
  }

  const keySigs = [
    { key: "Db", type: "major" },
    { key: "A", type: "major" },
    { key: "Ab", type: "minor" },
    { key: "E", type: "minor" },
  ];

  const renderTextInputs = () => {
    return keySigs.map((keySig, index) => (
      <div
        key={index}
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{ fontWeight: "lighter", fontSize: "12px", minWidth: "40px", textAlign: "left" }}
        >{` ${keySig.type}`}</div>
        <FormInput
          name={keySig.key}
          type="text"
          value={textInput[keySig.key] || ""}
          width="65px"
          onChange={(e: ChangeEvent) =>
            setTextInput({ ...textInput, [keySig.key]: e.target.value })
          }
          required={false}
        />
      </div>
    ));
  };
  return (
    <div>
      <form ref={ref} id="submit-form-chords" onSubmit={handleInputSubmit}>
        <KeySigStaff
          clef={clef}
          evenbars={evenbars}
          addDoubleBarLine={true}
          numBars={numBars}
          chords={chords}
          width={width}
          noTimeSignature
          allDoubleBarLines
          keySig={keySigs.map((keySig) => keySig.key)}
        />
        <div style={gridInputInline}>{renderTextInputs()}</div>
      </form>
    </div>
  );
});
