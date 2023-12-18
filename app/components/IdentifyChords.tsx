import { useState } from "react";
import StaffChords from "./StaffChords";
import FormInput from "./FormInput";

export default function IdentifyChords({ numBars = 4, chords = [] }) {
  const initialFormInputState = Array.from({ length: numBars }, (_, index) => ({
    [index]: "",
  })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

  const [formInput, setFormInput] = useState(initialFormInputState);

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(formInput);
  }

  const renderFormInputs = () => {
    return Object.keys(formInput).map((key) => (
      <FormInput
        key={key}
        name={key}
        type="text"
        value={formInput[key]}
        width="50px"
        onChange={(e) => setFormInput({ ...formInput, [key]: e.target.value })}
        required={true}
      />
    ));
  };

  return (
    <div>
      <StaffChords addDoubleBarLine={true} numBars={numBars} chords={chords} />
      <form
        id="submit-form"
        className="ml-24 grid grid-cols-7"
        onSubmit={handleFormSubmit}
      >
        {renderFormInputs()}
      </form>
    </div>
  );
}
