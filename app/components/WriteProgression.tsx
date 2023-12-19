import { useState } from "react";
import BlankStaff from "./BlankStaff";
import FormInput from "./FormInput";
import { WriteProg, FormEvent, ChangeEvent } from "../types";

export default function WriteProgression({
  numBars = 4,
  handleProg,
}: WriteProg) {
  const initialNumeralInputState = Array.from(
    { length: numBars },
    (_, index) => ({
      [index]: "",
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialNumeralInputState
  );

  function handleNumeralSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("numeralInput", numeralInput);
    handleProg(numeralInput);
  }

  const renderNumeralInputs = (
    start: number | undefined,
    end: number | undefined
  ) => {
    return Object.keys(numeralInput)
      .slice(start, end)
      .map((key) => (
        <FormInput
          key={key}
          name={key}
          type="text"
          value={numeralInput[key]}
          width="70px"
          onChange={(e: ChangeEvent) =>
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
