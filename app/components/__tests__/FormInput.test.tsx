import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormInput from "../FormInput";
import { useState } from "react";

describe("FormInput Component", () => {
  test("renders the input with correct label and value", () => {
    render(
      <FormInput
        name="test"
        labelText="Test Label"
        value="test value"
        onChange={() => {}}
      />
    );

    const labelElement = screen.getByLabelText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveValue("test value");
  });

  test("calls onChange handler when input value changes", () => {
    const WrapperComponent = () => {
      const [value, setValue] = useState("");
      return (
        <FormInput
          name="test"
          labelText="Test Label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };

    render(<WrapperComponent />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(inputElement).toHaveValue("new value");
  });

  test("renders the input with correct type and placeholder", () => {
    render(
      <FormInput
        name="test"
        type="password"
        placeholder="Enter password"
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByPlaceholderText(/Enter password/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("renders the input with maxLength and required attributes", () => {
    render(
      <FormInput
        name="test"
        maxLength={10}
        required={true}
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("maxLength", "10");
    expect(inputElement).toBeRequired();
  });

  test("applies custom styles from props", () => {
    render(
      <FormInput
        name="test"
        width="200px"
        height="50px"
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveStyle({ width: "200px", height: "50px" });
  });
});
