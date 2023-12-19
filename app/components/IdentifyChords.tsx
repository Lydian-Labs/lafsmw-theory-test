import { useState } from "react";
import StaffChords from "./StaffChords";
import FormInput from "./FormInput";
import { WriteProps, FormEvent, ChangeEvent } from "../types";

export default function IdentifyChords({
  numBars = 4,
  chords = [],
  handleChords,
}: WriteProps) {
  const initialChordsInputState = Array.from(
    { length: numBars },
    (_, index) => ({
      [index]: "",
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

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
      <StaffChords addDoubleBarLine={true} numBars={numBars} chords={chords} />
      <form
        id="submit-form"
        // this grid-cols-7 is a hacky way to make the form inputs line up with the staff
        className="ml-24 grid grid-cols-7"
        onSubmit={handleChordsSubmit}
      >
        {renderChordsInputs()}
      </form>
    </div>
  );
}
