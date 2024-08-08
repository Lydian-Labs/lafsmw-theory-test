import { render, screen, cleanup } from "@testing-library/react";
import Staff from "../Staff";
import * as Flow from "vexflow";

jest.mock("vexflow");

describe("Staff Component", () => {
  afterEach(cleanup);

  test("renders without crashing", () => {
    render(<Staff chosenClef="treble" />);
    const container = screen.getByRole("presentation");
    expect(container).toBeInTheDocument();
  });

  test("renders with chords and calls Formatter", () => {
    const chords = [
      { keys: ["c/4"], duration: "q" },
      { keys: ["d/4"], duration: "q" },
      { keys: ["e/4"], duration: "q" },
      { keys: ["f/4"], duration: "q" },
    ];

    render(<Staff chosenClef="treble" chords={chords} numBars={4} />);
    expect(Flow.StaveNote).toHaveBeenCalledTimes(4);
    expect(Flow.Formatter.FormatAndDraw).toHaveBeenCalledTimes(4);
  });

  test("cleans up on unmount", () => {
    const { unmount } = render(<Staff chosenClef="treble" />);
    const container = screen.getByRole("presentation");
    unmount();
    expect(container.innerHTML).toBe("");
  });
});
