"use client";
import React, { useContext, useEffect, useState, ReactNode } from "react";
import ExamContext from "./createExamContext";
import { InputData } from "../lib/typesAndInterfaces";

type ExamContextType = {
  children: ReactNode;
};

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

export default function ExamContextProvider({ children }: ExamContextType) {
  const [formInput, setFormInput] = useState<InputState>(initialFormInputState);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <ExamContext.Provider value={formInput}>
      {loading ? <div>Loading...</div> : children}
    </ExamContext.Provider>
  );
}

// useExamContext is a custom hook that allows us to use the Exam context in our components - to access the current context value (consume the values from the Exam user context)
export function useExamContext() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error(
      "useExamContext must be used within an ExamContextProvider"
    );
  }
  return context;
}
