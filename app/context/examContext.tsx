"use client";
import { auth, db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { initialFormInputState } from "../lib/initialStates";
import { ExamContextType } from "../lib/typesAndInterfaces";
import ExamContext from "./createExamContext";
import { useRouter } from "next/navigation";
import { set } from "firebase/database";
import { getUserSnapshot } from "@/firebase/firestore/model";

export default function ExamContextProvider({ children }: ExamContextType) {
  const [loading, setLoading] = useState(true);
  const userRef = auth.currentUser;
  const newFormInput = { ...initialFormInputState, user: userRef?.displayName };
  const [formInput, setFormInput] = useState<any>(newFormInput);
  // console.log("newFormInput in ExamContextProvider:", newFormInput);

  const user = auth.currentUser?.displayName;

  useEffect(() => {
    const fetchSnapshot = async () => {
      try {
        const { success, message, error, res } = await getUserSnapshot();
        if (error) {
          console.error(message);
        } else {
          console.log("res in fetchSnapshot:", res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSnapshot();
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
    console.error("useExamContext error: context is undefined");
  }
  return context;
}
