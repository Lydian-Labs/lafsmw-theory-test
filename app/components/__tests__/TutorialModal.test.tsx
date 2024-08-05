import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TutorialModal from "../TutorialModal";

describe("TutorialModal Component", () => {
  const tutorialInstructions = [
    { instructionTitle: "Step 1", instructionText: "Do this first" },
    { instructionTitle: "Step 2", instructionText: "Then do this" },
    { instructionTitle: "Step 3", instructionText: "Finally do this" },
  ];

  test("renders without crashing", () => {
    render(<TutorialModal tutorialInstructions={tutorialInstructions} />);
    const buttonElement = screen.getByRole("button", { name: /Need Help?/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("opens the modal when the button is clicked", () => {
    render(<TutorialModal tutorialInstructions={tutorialInstructions} />);
    const buttonElement = screen.getByRole("button", { name: /Need Help?/i });

    fireEvent.click(buttonElement);

    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();
  });

  test("displays the correct instructions in the modal", () => {
    render(<TutorialModal tutorialInstructions={tutorialInstructions} />);
    const buttonElement = screen.getByRole("button", { name: /Need Help?/i });

    fireEvent.click(buttonElement);

    tutorialInstructions.forEach((instruction, index) => {
      expect(
        screen.getByText(`${index + 1}. ${instruction.instructionTitle}`)
      ).toBeInTheDocument();
      expect(screen.getByText(instruction.instructionText)).toBeInTheDocument();
    });
  });

  test("closes the modal when the close event is triggered", () => {
    render(<TutorialModal tutorialInstructions={tutorialInstructions} />);
    const buttonElement = screen.getByRole("button", { name: /Need Help?/i });

    fireEvent.click(buttonElement);

    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();

    fireEvent.keyDown(modalElement, { key: "Escape", code: "Escape" });

    expect(modalElement).not.toBeInTheDocument();
  });
});
