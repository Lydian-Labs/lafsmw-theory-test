import { FormEvent, useState } from "react";
import BlankStaff from "./BlankStaff";
import FormInput from "./FormInput";

export default function WriteProgression({ numBars = 4, handleBlues }) {
  const initialNumeralInputState = Array.from(
    { length: numBars },
    (_, index) => ({
      [index]: "",
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [numeralInput, setNumeralInput] = useState(initialNumeralInputState);

  //console.log("Object.keys(numeralInput):", Object.keys(numeralInput));

  function handleNumeralSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("numeralInput:", numeralInput);
    handleBlues(e, numeralInput);
  }

  const renderNumeralInputs = (start, end) => {
    return Object.keys(numeralInput)
      .slice(start, end)
      .map((key) => (
        <FormInput
          key={key}
          name={key}
          type="text"
          value={numeralInput[key]}
          width="70px"
          onChange={(e) =>
            setNumeralInput({ ...numeralInput, [key]: e.target.value })
          }
          required={false}
        />
      ));
  };

  return (
    <div>
      <BlankStaff numBars={4} />
      <form
        id="submit-form"
        // this grid-cols-4 is a hacky way to make the form inputs line up with the staff
        className="ml-24 grid grid-cols-4"
        onSubmit={handleNumeralSubmit}
      >
        {renderNumeralInputs(0, 4)}
      </form>
      <BlankStaff numBars={4} noTimeSignature={true} />
      <form
        id="submit-form"
        className="ml-24 grid grid-cols-4"
        onSubmit={handleNumeralSubmit}
      >
        {renderNumeralInputs(4, 8)}
      </form>
      <BlankStaff numBars={4} noTimeSignature={true} addDoubleBarLine={true} />
      <form
        id="submit-form"
        className="ml-24 grid grid-cols-4"
        onSubmit={handleNumeralSubmit}
      >
        {renderNumeralInputs(8, 12)}
      </form>
    </div>
  );
}
