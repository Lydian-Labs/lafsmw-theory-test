import { useState } from "react";
import StaffChords from "./StaffChords";
import FormInput from "./FormInput";

export default function IdentifyChords({
  numBars = 4,
  chords = [],
  handleChords,
}) {
  const initialChordsInputState = Array.from(
    { length: numBars },
    (_, index) => ({
      [index]: "",
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [chordsInput, setChordsInput] = useState(initialChordsInputState);

  function handleChordsSubmit(e) {
    e.preventDefault();
    console.log("chordsInput:", chordsInput);
    handleChords(e, chordsInput);
  }

  const renderChordsInputs = () => {
    return Object.keys(chordsInput).map((key) => (
      <FormInput
        key={key}
        name={key}
        type="text"
        value={chordsInput[key]}
        width="70px"
        onChange={(e) =>
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
