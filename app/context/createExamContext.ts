import { createContext } from "react";
import { InputData } from "../lib/typesAndInterfaces";

type Level =
  | "advanced-theory"
  | "advanced-improvisation"
  | "intro-to-arranging"
  | "intermediate-arranging"
  | "advanced-arranging"
  | "rhythm-class"
  | "sibelius-class"
  | "";

type InputState = {
  level: Level;
  keySignatures: InputData;
  chords: InputData;
  progressions: InputData;
  blues: InputData;
};

const initialFormInputState: InputState = {
  level: "",
  keySignatures: {},
  chords: {},
  progressions: {},
  blues: {},
};

const ExamContext = createContext(initialFormInputState);

export default ExamContext;
