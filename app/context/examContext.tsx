"use client";
import React, { useContext, useEffect, useState, ReactNode } from "react";
import ExamContext from "./createExamContext";
import { InputData } from "../lib/typesAndInterfaces";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config";

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
  user: any;
  level: Level;
  keySignatures: InputData;
  chords: InputData;
  progressions: InputData;
  blues: InputData;
};

const initialFormInputState: InputState = {
  user: null,
  level: "",
  keySignatures: {},
  chords: {},
  progressions: {},
  blues: {},
};

export default function ExamContextProvider({ children }: ExamContextType) {
  const [formInput, setFormInput] = useState<InputState>(initialFormInputState);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | any>(null);

  const userRef = auth.currentUser;

  async function getAndSetUser() {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    setUser(userRef?.displayName);
    setFormInput({ ...formInput, user: userRef?.displayName });
    console.log("name?", formInput.user);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
  }

  useEffect(() => {
    getAndSetUser();
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
