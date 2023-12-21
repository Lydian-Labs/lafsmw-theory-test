import Stack from "@mui/material/Stack";
import { ForwardedRef, forwardRef, useState } from "react";
import { ChangeEvent, FormEvent, WriteProg } from "../types";
import BlankStaff from "./BlankStaff";
import FormInput from "./FormInput";
import createInitialState from "../lib/createInitialState";

export default forwardRef(function WriteProgression(
  { numBars = 4, width, handleProg }: WriteProg,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialNumeralInputState = createInitialState(numBars);

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
      <form ref={ref} id="submit-form-blues" onSubmit={handleNumeralSubmit}>
        <Stack direction="column" spacing={2}>
          <BlankStaff numBars={4} width={width} />
          {/* this grid-cols-4 is a hacky way to make the form inputs line up with the staff */}
          <div className="grid grid-cols-4 pl-10">
            {renderNumeralInputs(0, 4)}
          </div>
          <BlankStaff numBars={4} noTimeSignature={true} width={width} />
          <div className="grid grid-cols-4 pl-10">
            {renderNumeralInputs(4, 8)}
          </div>
          <BlankStaff
            numBars={4}
            noTimeSignature={true}
            addDoubleBarLine={true}
            width={width}
          />
          <div className="grid grid-cols-4 pl-10">
            {renderNumeralInputs(8, 12)}
          </div>
        </Stack>
      </form>
    </div>
  );
});
