import { ForwardedRef, forwardRef, useState } from "react";
import BlankStaff from "./BlankStaff";
import FormInput from "./FormInput";
import { WriteBlues, FormEvent, ChangeEvent } from "../types";
import { Grid, Stack } from "@mui/material";

export default forwardRef(function WriteBlues(
  { numBars = 4, width, handleBlues }: WriteBlues,
  ref: ForwardedRef<HTMLFormElement>
) {
  const initialNumeralInputState = Array.from(
    { length: numBars },
    (_, index) => ({
      [index]: "",
    })
  ).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [numeralInput, setNumeralInput] = useState<Record<string, string>>(
    initialNumeralInputState
  );

  const widthREM = width / 16;
  const gapOfElement = (widthREM / 4) * 1.15;

  function handleNumeralSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("numeralInput:", numeralInput);
    handleBlues(numeralInput);
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
      <form
        ref={ref}
        id="submit-form-blues1"
        // this grid-cols-4 is a hacky way to make the form inputs line up with the staff
        //className="grid grid-cols-4"
        onSubmit={handleNumeralSubmit}
      >
        <Stack direction="column" spacing={2}>
          <BlankStaff numBars={4} width={width} />
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
