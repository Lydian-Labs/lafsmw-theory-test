// CustomButton.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomButton from "../CustomButton";

describe("CustomButton Component", () => {
  test("renders the button with the correct text", () => {
    render(<CustomButton onClick={() => {}}>Click me</CustomButton>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls the onClick function when clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Click me</CustomButton>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies the correct styles based on isEnabled prop", () => {
    const { rerender } = render(
      <CustomButton onClick={() => {}} isEnabled={true}>
        Enabled
      </CustomButton>
    );
    const enabledButton = screen.getByText(/enabled/i);
    expect(enabledButton).toHaveStyle("border-color: #0063cc");

    rerender(
      <CustomButton onClick={() => {}} isEnabled={false}>
        Disabled
      </CustomButton>
    );
    const disabledButton = screen.getByText(/disabled/i);
    expect(disabledButton).toHaveStyle("border-color: #a4b1bf");
  });
});
