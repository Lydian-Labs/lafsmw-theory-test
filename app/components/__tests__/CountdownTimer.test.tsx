import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountdownTimer from "../CountdownTimer";
import { useTimer } from "../../context/TimerContext";

// Mock the useTimer hook
jest.mock("../../context/TimerContext");

describe("CountdownTimer Component", () => {
  test("renders the countdown timer with formatted time", () => {
    // Mock implementation of useTimer
    (useTimer as jest.Mock).mockReturnValue({ timeLeft: 125 });

    render(<CountdownTimer />);

    const timeElement = screen.getByText(/Time Left: 02:05/i);
    expect(timeElement).toBeInTheDocument();
  });

  test("renders the countdown timer with zero time left", () => {
    (useTimer as jest.Mock).mockReturnValue({ timeLeft: 0 });

    render(<CountdownTimer />);

    const timeElement = screen.getByText(/Time Left: 00:00/i);
    expect(timeElement).toBeInTheDocument();
  });

  test("renders the countdown timer with single digit seconds", () => {
    (useTimer as jest.Mock).mockReturnValue({ timeLeft: 7 });

    render(<CountdownTimer />);

    const timeElement = screen.getByText(/Time Left: 00:07/i);
    expect(timeElement).toBeInTheDocument();
  });

  test("renders the countdown timer with minutes and seconds", () => {
    (useTimer as jest.Mock).mockReturnValue({ timeLeft: 367 });

    render(<CountdownTimer />);

    const timeElement = screen.getByText(/Time Left: 06:07/i);
    expect(timeElement).toBeInTheDocument();
  });
});
